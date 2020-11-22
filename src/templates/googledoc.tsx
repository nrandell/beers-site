import { graphql } from "gatsby"
import Img from "gatsby-image"
import { SEO } from "../components"

import React, { Fragment } from "react"

import "bootstrap/dist/css/bootstrap-reboot.css"
import "../styles/global.css"

export default ({
  data: {
    googleDocs: { name, cover, childMarkdownRemark },
  },
}) => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

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
