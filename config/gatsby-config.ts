/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Beers Fitness",
    titleTemplate: "%s | Beers Fitness",
    description: "Lockdown fitness with the Beers",
    url: "https://www.beers.fitness",
    image: "/thebeers.jpg",
  },
  /* Your site config here */
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typescript",
    },
    {
      resolve: "gatsby-source-google-docs",
      options: {
        debug: true,
        folders: ["1bSKjv2s23AdKCfILm6XULaZEWjeAAryo"],
        demoteHeadings: true,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-images", "gatsby-remark-prismjs"],
      },
    },
  ],
}
