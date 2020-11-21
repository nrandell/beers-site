import React from "react"

interface Props {
  pageContext: { id: string }
}

const SingleVideo: React.FC<Props> = props => {
  const { id } = props.pageContext

  return (
    <iframe
      src={`https://player.vimeo.com/video/${id}`}
      width="1024"
      height="768"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>
  )
}

export default SingleVideo
