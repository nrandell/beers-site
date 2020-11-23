import React, { Fragment } from "react"

import "bootstrap/dist/css/bootstrap-reboot.css"
import css from "./singleVideo.module.css"
import { Helmet } from "react-helmet"

interface Props {
  pageContext: { id: string }
}

const SingleVideo: React.FC<Props> = props => {
  const { id } = props.pageContext

  return (
    <Fragment>
      <Helmet bodyAttributes={{ class: css.body }} />
      <iframe
        className={css.video_frame}
        src={`https://player.vimeo.com/video/${id}`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </Fragment>
  )
}

export default SingleVideo
