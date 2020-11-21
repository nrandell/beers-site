import React, { Fragment } from "react"
import { SEO } from "../components"

interface VimeoInformation {
  title: string
  video_id: string
  thumbnail_url: string
}

interface Props {
  pageContext: { videos: VimeoInformation[] }
}

function fixupThumbnailUrl(url: string) {
  const lastUnderscore = url.lastIndexOf("_")
  const prefix = url.substring(0, lastUnderscore)
  return prefix + "_400x.jpg"
}
function buildVideo(video: VimeoInformation) {
  const { title, video_id, thumbnail_url } = video
  const realThumbnailUrl = fixupThumbnailUrl(thumbnail_url)
  const videoUri = "/video/" + video_id

  return (
    <a href={videoUri} key={video_id}>
      <h2>{title}</h2>
      <img src={realThumbnailUrl} alt={`Preview for ${title}`} />
    </a>
  )
}

const Video: React.FC<Props> = props => {
  const { pageContext } = props
  const { videos } = pageContext

  return (
    <Fragment>
      <SEO title="Videos" />
      <div className="videoGrid">{videos.map(buildVideo)}</div>
    </Fragment>
  )
}

export default Video
