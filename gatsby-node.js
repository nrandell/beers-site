const { resolve } = require("path")
const fetch = require("isomorphic-fetch")

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
          component: resolve(`src/templates/googledoc.js`),
        })
      })
    }
  } catch (e) {
    console.error(e)
  }
}

async function createVideoPage(graphql, createPage, reporter) {
  const result = await graphql(
    `
      query QueryRecordings {
        googleDocs(path: { eq: "/recordings" }) {
          childMarkdownRemark {
            htmlAst
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panic(result.errors)
  }

  try {
    const htmlAst = result.data.googleDocs.childMarkdownRemark.htmlAst
    const links = htmlAst.children
      .filter(c => c.type === "element")
      .map(c => c.children[0].properties.href)
    const videos = []
    for (let i = 0; i < links.length; i++) {
      const response = await fetch(
        "https://vimeo.com/api/oembed.json?url=" + links[i]
      )
      const json = await response.json()
      videos.push(json)
      createPage({
        path: "/video/" + json.video_id,
        component: resolve("src/templates/singleVideo.tsx"),
        context: { id: json.video_id },
      })
    }
    createPage({
      path: "/videos",
      component: resolve("src/templates/video.tsx"),
      context: { videos },
    })
  } catch (e) {
    reporter.panic(e)
  }
}

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  await createVideoPage(graphql, createPage, reporter)
  await createTemplatePage(graphql, createPage, reporter)
}
