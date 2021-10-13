// import { Switch, Route } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect, useState } from "react"
// import Boards from "./4-1.boards"
import Posts from "../components/Posts"

const Outer = styled.div`
  width: 100vw;
`;

const url =
  process.env.REACT_APP_URL ||
  "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function MainPage({ getPostList, postList }) {
  useEffect(() => {
    axios({
      url: url + "/postlist",
      method: "get",
      withCredentials: true,
    }).then((res) => {
      // setPostList(res.data)
      getPostList(res.data)
    })
  }, [])

  return (
    <Outer className="mainPage">
      <Header />
      <Navigation />
      <Posts boardTitle={'전체 게시물'} postListData={postList} />
    </Outer>
  )
}

// TODO
// [] 게시판 데이터 받아와서 라우팅된 페이지에 맞게 뿌리기
// [] 라우팅

// 위 두 가지 전부 데이터 배열에 map 써서 할 수 있으면 멋있을텐데...
// 수도코드
// {
// data.map(obj => {
//   return (
//     <Route path={`/board/${obj.animalType}`}>
//       <h1 key={uuid something}>{obj.animalType}</h1>
//       <Posts key={uuid something} data={obj.posts} />
//     </Route>
//   );
// })}
// }
