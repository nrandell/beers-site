#! /usr/bin/env node
/* eslint-disable no-console */

const GoogleOAuth2 = require("google-oauth2-env-vars")

async function generateToken() {
  const googleOAuth2 = new GoogleOAuth2({
    scope: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    token: "GOOGLE_SHEETS_TOKEN",
    apis: ["sheets.googleapis.com"],
  })

  await googleOAuth2.generateEnvVars()

  console.log("")

  process.exit()
}

generateToken()
