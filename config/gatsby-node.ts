import Axios from "axios"
import { resolve } from "path"
import { CreatePagesArgs, Page, Reporter } from "gatsby"
import { google } from "googleapis"
const GoogleOAuth2 = require("google-oauth2-env-vars")

async function createTemplatePage(graphql, createPage, reporter) {
  const result = await graphql(
    `
      {
        allGoogleDocs {
          nodes {
            path
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panic(result.errors)
  }

  try {
    const { allGoogleDocs } = result.data

    if (allGoogleDocs) {
      allGoogleDocs.nodes.forEach(({ path }) => {
        createPage({
          path,
          component: resolve(`src/templates/googledoc.tsx`),
        })
      })
    }
  } catch (e) {
    console.error(e)
  }
}

export interface VideoInformation {
  link: string
  type: string
  date: Date
}

export interface VimeoInformation {
  title: string
  video_id: string
  thumbnail_url: string
}

export interface CombinedVideoInformation {
  video: VideoInformation
  vimeo: VimeoInformation
}

async function getVideoInformation(reporter: Reporter) {
  const googleOAuth2 = new GoogleOAuth2({
    token: "GOOGLE_SHEETS_TOKEN",
  })
  const auth = await googleOAuth2.getAuth()
  const sheets = google.sheets({ version: "v4", auth })
  const r = await sheets.spreadsheets.values.get({
    spreadsheetId: "1t9GNo43G1-O7yLpBa1-PcRz2iSGR6hdF4dR84DMx2Sw",
    range: "A:C",
  })

  if (r) {
    const rows = r.data.values
    if (rows?.length) {
      const videos = rows.slice(1).map(r => {
        const link: string = r[0]
        const type: string = r[1]
        const date: Date = r[2]
        const info: VideoInformation = { link, type, date }
        return info
      })
      return videos
    }
  }

  throw new Error("Failed to retrieve data")
}

async function buildVideoPages(
  createPage: (page: Page<{}>) => void,
  reporter: Reporter
) {
  const videos = await getVideoInformation(reporter)
  reporter.info(`Got ${videos.length} videos: ${JSON.stringify(videos)}`)

  const videosInformation: CombinedVideoInformation[] = []
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i]
    const { link, type, date } = video
    reporter.info("Getting information about: " + link)
    const response = await Axios.get<VimeoInformation>(
      "https://vimeo.com/api/oembed.json?url=" + link
    )
    const vimeo = response.data
    videosInformation.push({ video, vimeo })
    createPage({
      path: "/video/" + vimeo.video_id,
      component: resolve("src/templates/singleVideo.tsx"),
      context: { id: vimeo.video_id },
    })
  }

  createPage({
    path: "/videos",
    component: resolve("src/templates/video.tsx"),
    context: { information: videosInformation },
  })
}

export async function createPages(args: CreatePagesArgs) {
  const { graphql, actions, reporter } = args
  const { createPage } = actions

  await buildVideoPages(createPage, reporter)
  await createTemplatePage(graphql, createPage, reporter)
}
