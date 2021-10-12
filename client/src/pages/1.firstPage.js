import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  /* box-sizing: border-box; */
  /* margin-top: -320px; */
  margin-top: -96px;
  width: 1920px;
  height: 1080px;
  /* background-color: papayawhip; */
  background-color: #ffefd5;
`

const Header = styled.h1`
  /* border-top: 4em;
  margin-bottom: 4em; */
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 9em;
  text-align: center;
  color: palevioletred;
`
const SigninBtn = styled.h1`
  font-size: 4em;
  /* font-size: 200px; */
  text-align: center;
  color: palevioletred;

  /* &:hover {
    background: gold;
  } */
`
export const SignInModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`
export const SignInModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`

export const SingInModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`

export const SignInModalView = styled.div`
  font-size: 4em;
  color: palevioletred;

  border-radius: 20px;
  background-color: #fffdea;
  width: 800px;
  height: 500px;
`
export const SignInModalForm = styled.div`
  padding-top: 3em;
  font-size: 0.5em;
  color: palevioletred;

  border-radius: 20px;
  background-color: #fffdea;
  /* width: 800px;
  height: 500px; */
`

axios.defaults.withCredentials = true
const url =
  process.env.REACT_APP_URL ||
  "http://ec2-3-34-2-204.ap-northeast-2.compute.amazonaws.com"

export const FirstPage = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loginInfo, setLoginInfo] = useState({ id: "", password: "" })
  const [errMessage, setErrMessage] = useState(false)
  const history = useHistory()

  function signup() {
    history.push("/signup")
  }

  function openSignInModalHandler() {
    setIsOpen(!isOpen)
    //console.log(isOpen)
    //history.push("/signup")
  }

  const handleInputValue = (key) => (e) => {
    //console.log({ [key]: e.target.value })
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }

  function signUpHandler() {
    //로그인시
    //console.log("로그인 버튼클릭시 콘솔")
    //console.log(loginInfo)
    // if (!loginInfo.id || !loginInfo.password) {
    //로그인 정보를 입력하지 않았을 때
    if (loginInfo === null || !loginInfo.id || !loginInfo.password) {
      setErrMessage(" 아이디와 패스워드를 입력하세요.")
    }else { //로그인 정보를 모두 입력했을 때 
      axios({
        url: url + "/signin",
        method: "post",
        data: { id: loginInfo.id, password: loginInfo.password },
        withCredentials: true,

      }) 
      .then((res) => {
        alert('로그인 완료')

        props.loginFunc()
      })
    }
  }

  function socialSignUpHandler() {
    //console.log("소셜로그인 준비완료")
  }

  return (
    <Container>
      <Header>Animal Chat🐣</Header>
      <SigninBtn onClick={openSignInModalHandler}>로그인</SigninBtn>
      <SigninBtn onClick={signup}>회원가입</SigninBtn>
      {isOpen === false ? null : (
        <div>
          <SignInModalContainer>
            <SignInModalBackdrop>
              <SignInModalView>
                Animal Chat🐣
                <SignInModalForm>
                  <div>
                    <div>아이디12</div>
                    <input type="id" onChange={handleInputValue("id")} />
                  </div>
                  <div></div>
                  <div>
                    <div>패스워드</div>
                    <input
                      type="password"
                      onChange={handleInputValue("password")}
                    />
                  </div>
                  <div>{errMessage}</div>
                </SignInModalForm>
                <button onClick={signUpHandler}>로그인</button>
                <button onClick={socialSignUpHandler}>구글 소셜 로그인</button>
              </SignInModalView>
            </SignInModalBackdrop>
          </SignInModalContainer>
        </div>
      )}
    </Container>
  )
}

export default FirstPage
