import React, { useState } from "react"
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import axios from "axios"
import FirstPage from "./pages/1.firstPage"
import MainPage from "./pages/4.mainPage"
import Post from "./pages/6.post"
import "./App.css"

function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div>
      <Switch>
        <Route path="/firstpage">
          <FirstPage />
        </Route>
        <Route exact path="/mainpage">
          <MainPage />
        </Route>
        <Route exact path="/post">
          <Post />
        </Route>
        <Route path="/">
          {isLogin ? <Redirect to="/mainpage" /> : <Redirect to="/firstpage" />}
        </Route>
      </Switch>
    </div>
  )
}

export default App
