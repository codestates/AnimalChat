import Posts from "../components/Posts"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect } from "react"

export default function Parrot(props) {
  useEffect(() => {
    props.curAnimalChange("parrot")
  }, [])
  return (
    <div className="mainPage">
      <Header />
      <Navigation isLinkToWritePage />
      <h2>앵무새</h2>
      <Posts mockBgColorPost={"#96e0df"} isLinkToWritePage />
    </div>
  )
}
