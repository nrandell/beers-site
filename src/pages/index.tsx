import { graphql } from "gatsby"
import React from "react"
import { Layout, SEO } from "../components"

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
    <Layout>
      <SEO title="Home Page" />
      <div
        dangerouslySetInnerHTML={{
          __html: cleanedHtml,
        }}
      />
    </Layout>
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
