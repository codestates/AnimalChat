import React, { useState } from "react"
import axios from "axios"
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// styled components
const HeaderFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopButtonsArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid red;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const url =
  process.env.REACT_APP_URL || process.env.REACT_EC2_URL
  
export default function Header() {
  const [isLogin, setIsLogin] = useState(false)
  const [userinfo, setUserinfo] = useState(null)

  // button event
  function logoutEventListener() {
  // console.log('send logout request here')
  axios({
    url: url + "/signout",
    method: "post",
    withCredentials: true,
  })
  //확인필요
  .then((res) => { 
    setUserinfo(null)
    setIsLogin(false)
  })
}
  

  return (
    <div className="headerComponent">
      <HeaderFlexDiv>
        <TopButtonsArea>
          {/* 링크 연결 : 마이페이지-라우팅, 로그아웃-클릭 이벤트, 랜딩페이지 라우팅*/}
          <Link to="/mypage">
            <button className="headerTopButtons">마이페이지</button>
          </Link>
          <Link to="/firstpage">
            <button 
              className="headerTopButtons"
              onClick={logoutEventListener}
            >
              로그아웃
            </button>
          </Link>
        </TopButtonsArea>
        <TitleArea>
          {/* header-title에 메인 페이지 링크 연결 */}
          <Link to="/board">
            <h1 className="headerTitle">Animal Chat🐱</h1>
          </Link>
          <h2 className="headerDesc">반려동물 집사 커뮤니티</h2>
        </TitleArea>
      </HeaderFlexDiv>
    </div>
  );
}

// TODO
// [x] react-router-dom 적용 필요
  // [] 진짜 라우트로 바꿔 넣기