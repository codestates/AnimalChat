import Posts from "../components/Posts"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect } from "react"

export default function Hamster(props) {

  useEffect(() => {
    props.curAnimalChange("hamster")
  }, [])

  return (
    <div className="mainPage">
      <Header />
      <Navigation isLinkToWritePage />
      <h2>햄스터</h2>
      <Posts mockBgColorPost={"#6D9886"} />
    </div>
  )
}
