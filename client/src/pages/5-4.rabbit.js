import Posts from "../components/Posts"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect } from "react"

export default function Rabbit(props) {
  useEffect(() => {
    props.curAnimalChange("rabbit")
  }, [])
  return (
    <div className="mainPage">
      <Header />
      <Navigation isLinkToWritePage />
      <h2>토끼</h2>
      <Posts mockBgColorPost={"#96abe0"} />
    </div>
  )
}
