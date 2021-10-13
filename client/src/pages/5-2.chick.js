import Posts from "../components/Posts"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect } from "react"

export default function Chick(props) {
  useEffect(() => {
    props.curAnimalChange("chick")
  }, [])
  return (
    <div className="mainPage">
      <Header />
      <Navigation isLinkToWritePage />
      <Posts title="병아리" isLinkToWritePage />
    </div>
  )
}
