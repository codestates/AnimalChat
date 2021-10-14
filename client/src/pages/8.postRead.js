import { useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import Comment from "./8.postRead-comment"

// styled-component
const Outer = styled.div`
  width: 100vw;
  height: 100vh;
`

const Contents = styled.div`
  background-color: #FEEFD5;
  height: 100vh;
`

const PostReadSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 1rem;
  }

  & .postContent {
    font-size: 1.2rem;
    padding: 1rem;
    width: 90%;
    margin-bottom: 2rem;
  }

  & img {
    border: 1px solid black;
  }
`

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 2rem);
`

const PostTitleLeft = styled.div`
  display: flex;
  flex-grow: 8;
  align-items: center;

  & > img {
    border: 1px solid red;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }

  & > h1 {
    margin-right: 2rem;
  }
`

const PostButtons = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 2;
  align-items: center;

  & button {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 1rem;
    padding: 0.5rem;
    margin: 0.5rem;
    color: white;
  }
  & .editPost {
    flex-grow: 2;
    background-color: #4876bf;
    color: white;
  }
  & .deletePost {
    flex-grow: 1;
    background-color: #e00000;
  }
`

const CommentSection = styled.div`
  width: inherit;
  padding: 1rem;

  & li {
    padding: 1rem;
    margin: .5rem;
  }
`

const PostComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  margin-bottom: 2rem;

  & .commentUsername {
    display: flex;
    font-size: .8rem;
    & .username {
      font-weight: bold;
      margin-right: .5rem;
    }
    & .inputTitle {
      margin-right: .5rem;
    }
  }

  & input {
    width: 70%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-right: 1rem;
  }
  & button {
    background-color: #419300;
    color: white;
    margin-left: 1rem;
    padding: .5rem;
  }
`

const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  & li {
    display: flex;
    align-items: center;
  }
  & .comment__createdAt {
    margin: auto 1rem;
  }
  & button {
    padding: 0.5rem;
    background-color: #ffc257;
  }
`

const BackButton = styled.button`
  font-weight: bold;
  text-decoration: underline;
  background-color: transparent;
  color: #7b7b7b;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.8rem;
`

// axios
axios.defaults.withCredentials = true
const url =
  process.env.REACT_APP_URL ||
  "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

// 댓글 : content
export default function PostRead(props) {
  // title - 수정버튼 : history.push
  console.log(props.curPost)
  const history = useHistory()
  function editPostButton(event) {
    history.push("/postedit")
  }
  useEffect(() => {
    handleButtonClick()
  }, [])

  // title - 삭제 :
  const deletePostButton = (event) => {
    alert("게시물을 삭제하시겠습니까?")
    // 데이터베이스 게시물 삭제
    if(window.confirm("게시물을 삭제하시겠습니까?")){
      axios({
        url: url + "/post",
        method: "delete",
        data: {
          // 삭제될 게시물 정보들
          // user_id,
          // post_title,
          // post_content,
          // post_img,
          // animalcategory
        }
      })
      .then(() => {
        alert("게시물 삭제 완료")
        history.push("/mainpage") // 또는 board/{해당동물} 페이지로
      })
    }
  }

  // 뒤로 버튼
  const backButtonHandler = () => {
    history.goBack()
  }

  // 댓글
  const [contentMsg, setContentMsg] = useState("") // 작성되어지는 댓글 (input)
  const [cotentList, setContentList] = useState([]) // 댓글 목록

  // 댓글작성 버튼
  function handleButtonClick() {
    // createdAt: new Date().toLocaleDateString("ko-kr"), // 여기 두 줄 뭔지 모르겠어요...
    // updatedAt: new Date().toLocaleDateString("ko-kr"), // 일단 주석처리 합니다
    // axios({
    //   url: url + "/commentsend",
    //   method: "post",
    //   data: {
    //     post_id: props.curPost.id,
    //     comment_user_id: props.userinfo.user_id,
    //     comment_content: contentMsg,
    //   },
    //   withCredentials: true,
    // }).then((res) => {
    //   return axios({
    //     url: url + "/commentlist",
    //     method: "post",
    //     data: {
    //       post_id: props.curPost.id,
    //       comment_user_id: props.userinfo.user_id,
    //     },
    //     withCredentials: true,
    //   }).then((res) => setContentList(res.data))
    // })
  }

  // 댓글내용
  const handleChangeMsg = (event) => {
    setContentMsg(event.target.value)
  }
  console.log(cotentList)

  return (
    <Outer>
      <Header />
      <Navigation />
      {/* 내사진, 제목, 날짜, 버튼 */}
      <Contents>
        <PostReadSection>
          <PostTitle className="postTitle">
            <PostTitleLeft className="postTitle_left">
              <img className="profilePic" alt="프로필사진" />
              <h1 className="title">제목 테스트</h1>
              <p>2000. 00. 00.</p>
              {/* <h1 className="title">{props.curPost.post_title}</h1>
              <p>{props.curPost.updatedAt}</p> */}
            </PostTitleLeft>

            <PostButtons className="postTitle_right">
              <button className="editPost" onClick={editPostButton}>수정</button>
              <button className="deletePost">삭제</button>
            </PostButtons>
          </PostTitle>

          {/* 게시물 사진 */}
          <div className="postPic">
            <img
              className="picture"
              // src={url + props.curPost.post_img}
              src={'testing'}
              alt="게시물 사진"
            />
          </div>

          {/* 게시물 내용 */}
          {/* <div className="postContent">{props.curPost.post_content}</div> */}
          <div className="postContent">{'글 내용 테스트'}</div>

          {/* 뒤로 버튼 */}
          <BackButton className="backButton" onClick={backButtonHandler}>뒤로</BackButton>
        </PostReadSection>
        {/* 댓글 작성 */}

        <CommentSection>
          <PostComment className="postComment">
            {/* <div>{props.userinfo.user_id} 댓글달기:</div> */}
            <div className="commentUsername">
              <span className="username">{'유저이름 테스트'}</span>
              <span className="inputTitle">댓글달기</span>
            </div>
            <input
              className="inputComment"
              type="text"
              placeholder="댓글을 작성해주세요."
              onChange={handleChangeMsg}
            />
            <button onClick={handleButtonClick}>작성</button>
          </PostComment>

          {/* 댓글 목록 */}
          <CommentList className="commentsList">
            {/* {cotentList.map((content) => (
              <Comment content={content} />
            ))} */}
            <Comment content={'댓글1'} />
            <Comment content={'댓글2'} />
            <Comment content={'댓글3'} />
            <Comment content={'댓글4'} />
          </CommentList>
        </CommentSection>
      </Contents>
    </Outer>
  )
}
