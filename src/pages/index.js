import { graphql } from "gatsby"
import React from "react"

export default ({
  data: {
    googleDocs: { name, childMarkdownRemark },
  },
}) => {
  return <div dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }} />
}

export const pageQuery = graphql`
  query MyQuery {
    googleDocs(path: { eq: "/home-page" }) {
      name
      childMarkdownRemark {
        html
      }
    }
  }
`
