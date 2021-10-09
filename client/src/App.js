import React, { useState } from "react"
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import axios from "axios"
import FirstPage from "./pages/1.firstPage"
import MainPage from "./pages/4.mainPage"
import Post from "./pages/6.post"
import "./App.css"

function App() {
  // /// 서버배포정상 완료시 테스트 코드
  const [isLogin, setIsLogin] = useState(false)
  function onclickButton() {
    axios
      .get(
        "http://http://ec2-3-34-2-204.ap-northeast-2.compute.amazonaws.com",
        { withCredentials: true }
      )
      .then(function (response) {
        setIsLogin(true)
      })
  }
  return (
    <div className="App">
      <button onClick={onclickButton}> 버튼 </button>
      {isLogin ? "hello world" : "welcome hell world :)"}
    </div>
  )
  // ///

  // const [isLogin, setIsLogin] = useState(false)
  // return (
  //   <div>
  //     <Switch>
  //       <Route path="/firstpage">
  //         <FirstPage />
  //       </Route>
  //       <Route exact path="/mainpage">
  //         <MainPage />
  //       </Route>
  //       <Route exact path="/post">
  //         <Post />
  //       </Route>
  //       <Route path="/">
  //         {isLogin ? <Redirect to="/mainpage" /> : <Redirect to="/firstpage" />}
  //       </Route>
  //     </Switch>
  //   </div>
  // )
}

export default App
