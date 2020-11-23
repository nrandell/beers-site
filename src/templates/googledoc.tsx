import { graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { Layout, SEO } from "../components"

import React from "react"

interface Props {
  data: {
    googleDocs: {
      name: string
      cover: {
        image: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
      childMarkdownRemark: {
        html: string
      }
    }
  }
}

const GoogleDoc: React.FC<Props> = ({
  data: {
    googleDocs: { name, cover, childMarkdownRemark },
  },
}) => {
  return (
    <Layout>
      <SEO title={name} />
      <div>
        <h1>{name}</h1>
        {cover && (
          <Img
            style={{ width: "500px", marginBottom: "2rem" }}
            fluid={cover.image.childImageSharp.fluid}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }} />
      </div>
    </Layout>
  )
}

export default GoogleDoc

export const pageQuery = graphql`
  query PageBySlug($path: String!) {
    googleDocs(path: { eq: $path }) {
      name
      cover {
        image {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      childMarkdownRemark {
        html
      }
    }
  }
`
