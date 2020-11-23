import { Page } from "gatsby"
import React from "react"
import { Layout } from "../components"

const Page404: React.FC = () => {
  return (
    <Layout>
      <h1>Not enough energy to find that page</h1>
      <a href="/">Try again</a>
    </Layout>
  )
}

export default Page404
