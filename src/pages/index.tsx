import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

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
      <Helmet>
        <title>Beers Fitness</title>
      </Helmet>
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
