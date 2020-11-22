import React, { Fragment } from "react"
import { SEO } from "../components"

import "bootstrap/dist/css/bootstrap-reboot.css"
import "../styles/global.css"
import { CombinedVideoInformation } from "../../config/gatsby-node"

interface Props {
  pageContext: { information: CombinedVideoInformation[] }
}

function fixupThumbnailUrl(url: string) {
  const lastUnderscore = url.lastIndexOf("_")
  const prefix = url.substring(0, lastUnderscore)
  return prefix + "_300x.jpg"
}
function buildVideo(information: CombinedVideoInformation) {
  const { video, vimeo } = information
  const { video_id, thumbnail_url } = vimeo
  const { type, date } = video
  const realThumbnailUrl = fixupThumbnailUrl(thumbnail_url)
  const videoUri = "/video/" + video_id

  return (
    <a href={videoUri} key={video_id}>
      <h2>
        {type} on {date}
      </h2>
      <img src={realThumbnailUrl} alt={`Preview for ${type} on ${date}`} />
    </a>
  )
}

const Video: React.FC<Props> = props => {
  const { pageContext } = props
  const { information } = pageContext

  return (
    <Fragment>
      <SEO title="Videos" />
      <h1>Videos</h1>
      <p>
        We occasionally record classes for those of you that cannot make our
        online classes. They are posted here for your pleasure (or pain)
      </p>
      <div className="videoGrid">{information.map(buildVideo)}</div>
    </Fragment>
  )
}

export default Video
