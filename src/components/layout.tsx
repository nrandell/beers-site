import React from "react"
import "bootstrap/dist/css/bootstrap-reboot.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "./layout.css"

export const Layout: React.FC = props => {
  return <div>{props.children}</div>
}
