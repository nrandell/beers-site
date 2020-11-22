import React from "react"

import "bootstrap/dist/css/bootstrap-reboot.css"
import "../styles/video.css"

interface Props {
  pageContext: { id: string }
}

const SingleVideo: React.FC<Props> = props => {
  const { id } = props.pageContext

  return (
    <iframe
      className="video_frame"
      src={`https://player.vimeo.com/video/${id}`}
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>
  )
}

export default SingleVideo
