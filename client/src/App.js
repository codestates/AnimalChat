import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import axios from "axios"
import NavBar from "./pages/0.navBar"
import FirstPage from "./pages/1.firstPage"
import Signup from "./pages/2.signUp"
import MainPage from "./pages/4-2.mainPage"
import Hamster from "./pages/5-1.hamster"
import Chick from "./pages/5-2.chick"
import Parrot from "./pages/5-3.parrot"
import Rabbit from "./pages/5-4.rabbit"
import Hedgehog from "./pages/5-5.hedgehog"
import Post from "./pages/6.post"
import PostEdit from "./pages/7.postEdit"
import PostRead from "./pages/8.postRead"
import MyPage from "./pages/9.myPage"
// import MyPageEdit from "./pages/10.myPageEdit"
// import PasswordChange from "./pages/11-2.pwdSection"
import PwdEditPage from "./pages/11-1.pwdEdit"

import "./App.css"
const url =
  process.env.REACT_APP_URL || process.env.REACT_EC2_URL

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [userinfo, setUserinfo] = useState(null)
  const history = useHistory()

  function loginFunc() {
    setIsLogin(!isLogin)
    authorization()
    history.push("/")
  }

  function authorization() {
    axios({
      url: url + "/auth",
      method: "get",
      withCredentials: true,
    })
    .then((res) => {
      //console.log(res)
      setUserinfo(res.data) 
      setIsLogin(true)
      history.push("/")
    })
  }


  return (
    <>
      <NavBar />
      <div className="entire">
        <Switch>
          <Route exact path="/firstpage">
            <FirstPage isLogin={isLogin} loginFunc={loginFunc} />
          </Route>
          <Route exact path="/signup">
            <Signup loginFunc={loginFunc} />
          </Route>
          <Route exact path="/mainpage">
            <MainPage userinfo={userinfo} />
          </Route>
          <Route exact path="/board/hamster">
            <Hamster />
          </Route>
          <Route exact path="/board/chick">
            <Chick />
          </Route>
          <Route exact path="/board/parrot">
            <Parrot />
          </Route>
          <Route exact path="/board/rabbit">
            <Rabbit />
          </Route>
          <Route exact path="/board/hedgehog">
            <Hedgehog />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/postedit">
            <PostEdit />
          </Route>
          <Route path="/postread">
            <PostRead />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>

          {/* <Route path="/mypageedit">
            <MyPageEdit />
          </Route> */}
          <Route path="/pwdedit">
            <PwdEditPage userinfo={userinfo} />
          </Route>

          <Route path="/">
            {isLogin ? (
              <Redirect to="/mainpage" />
            ) : (
              <Redirect to="/firstpage" />
            )}
          </Route>
        </Switch>
      </div>
    </>
  )
}
export default App
