import { graphql } from "gatsby"
import React from "react"
import { SEO } from "../components"

import "bootstrap/dist/css/bootstrap-reboot.css"
import "../styles/global.css"

interface Props {
  data: {
    googleDocs: {
      childMarkdownRemark: {
        html: string
      }
    }
  }
}

const Index: React.FC<Props> = props => {
  const { data } = props
  const html = data.googleDocs.childMarkdownRemark.html
  const cleanedHtml = html.replace(new RegExp("http://./", "g"), "/")
  return (
    <div className="application">
      <SEO title="Home Page" />
      <div
        dangerouslySetInnerHTML={{
          __html: cleanedHtml,
        }}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    googleDocs(path: { eq: "/home-page" }) {
      childMarkdownRemark {
        html
      }
    }
  }
`

export default Index
