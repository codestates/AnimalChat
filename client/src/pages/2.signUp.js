import React, { useEffect, useState } from "react"
import axios from "axios"
import DatePicker, { registerLocale, useHistory } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

axios.defaults.withCredentials = true

const url =
  process.env.REACT_APP_URL || process.env.REACT_EC2_URL

export default function Signup(props) {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
    nickName: "",
    animalName: "",
    selectType: "",
    animalYob: "",
  })
  console.log(userInfo)

  const {
    userId,
    password,
    nickName,
    animalName,
    selectType,
    animalYob,
  } = userInfo

  const handleInputValue = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  // 반려동물 type 선택
  const selectList = [
    "선택하세요",
    "햄스터",
    "병아리",
    "앵무새",
    "토끼",
    "고슴도치",
  ]
  const [Selected, setSelected] = useState("선택하세요")

  const handleSelect = (e) => {
    setSelected(e.target.value)
    setUserInfo({
      ...userInfo,
      selectType: e.target.value,
    })
  }

  // 반려동물 출생년도
  const [startDate, serStartDate] = useState(new Date())

  function dateFormat(date) {
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month >= 10 ? month : "0" + month
    day = day >= 10 ? day : "0" + day

    return date.getFullYear() + "." + month + "." + day
  }

  // userId 유효성검사
  const [userCheck, setUserCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [nickNameCheck, setNickNameCheck] = useState(false)

  // 유효성 검사 (아이디, 비밀번호, 닉네임) , 중복 사용이 있는지 확인 필요
  let regUserId = /^[a-zA-z0-9]{6,12}$/ // 아이디
  let regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/ // 비밀번호
  let regNickName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/ // 닉네임, 2 ~ 15자 한글, 영문, 숫자

  // 아이디
  useEffect(() => {
    if (userId) {
      const checkId = regUserId.test(userId)
      // console.log('아이디 유효성 검사 : ', checkId)
      // console.log(userId);

      if (checkId) {
        setUserCheck(true)
      } else {
        setUserCheck(false)
        // 유효하지않다는 메세지 띄우기
      }
    }
  }, [userId])

  // 비밀번호
  useEffect(() => {
    if (password) {
      const checkPassword = regPassword.test(password)

      if (checkPassword) {
        setPasswordCheck(true)
      } else {
        setPasswordCheck(false)
        // 유효하지않다는 메세지 띄우기
      }
    }
  }, [password])

  // 닉네임
  useEffect(() => {
    if (nickName) {
      const checkNickName = regNickName.test(nickName)

      if (checkNickName) {
        setNickNameCheck(true)
      } else {
        setNickNameCheck(false)
        // 유효하지않다는 메세지 띄우기
      }
    }
  }, [nickName])

  // * 추가필요 입력한 아이디, 닉네임이 중복되지 않아야함 : 입력후 회원가입버튼 눌렀을시 서버에 데이터가 보내지면서 기존 유저정보에서 중복검사

  // 회원가입 버튼
  const handleSubmit = () => {
    if (
      userCheck &&
      passwordCheck &&
      nickNameCheck &&
      Selected !== "선택하세요" &&
      userInfo.animalName.length !== 0
    ) {
      axios({
        url: url + "/signup",
        method: "post",
        data: userInfo,
        "Content-Type": "application/json",
        withCredentials: true,
      }).then((res) => {
        if (res.status === 201) {
          alert("회원가입 완료")
          props.loginFunc()
        } else if (res.status === 202) {
          alert("아이디 중복입니다.")
        } else if (res.status === 203) {
          alert("닉네임 중복입니다.")
        }
      })
    } else {
      // 입력하지 않았을때
      alert("모든 항목은 필수입니다.")
      console.log("회원가입버튼 userCheck", userCheck)
    }
  }

  return (
    <>
      <div className="form">
        <center className="center">
          <h1>회원가입</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <p>아이디</p>
              <input
                type="userId"
                name="userId"
                placeholder="6 ~ 12자, 영문 또는 숫자"
                onChange={handleInputValue}
              />
              {userCheck ? null : (
                <div style={{ color: "red", fontSize: "10px" }}>
                  아이디 형식이 올바르지 않습니다.
                </div>
              )}
            </div>

            <div>
              <p>비밀번호</p>
              <input
                type="password"
                name="password"
                placeholder="4 ~ 15자, 영문과 숫자 포함"
                type="password"
                onChange={handleInputValue}
              />
              {passwordCheck ? null : (
                <div style={{ color: "red", fontSize: "10px" }}>
                  비밀번호 형식이 올바르지 않습니다.
                </div>
              )}
            </div>

            <div>
              <p>닉네임(2글자 이상)</p>
              <input
                placeholder="2 ~ 15자, 한글, 영문, 숫자"
                type="nickName"
                name="nickName"
                onChange={handleInputValue}
              />
              {nickNameCheck ? null : (
                <div style={{ color: "red", fontSize: "10px" }}>
                  닉네임 형식이 올바르지 않습니다.
                </div>
              )}
            </div>

            <div>
              <h3>반려동물 정보</h3>

              <p>반려동물의 종류</p>
              <select onChange={handleSelect} value={Selected}>
                {selectList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                    {console.log(Selected)}
                  </option>
                ))}
              </select>
              {Selected !== "선택하세요" ? null : (
                <div style={{ color: "red", fontSize: "10px" }}>
                  종류를 선택하세요.
                </div>
              )}
            </div>

            <div>
              <p>반려동물의 이름</p>
              <input
                type="animalName"
                name="animalName"
                onChange={handleInputValue}
              />
            </div>

            <div>
              <p>반려동물의 생년월일</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  console.log(dateFormat(date))
                  serStartDate(date)
                  setUserInfo({
                    ...userInfo,
                    animalYob: dateFormat(date),
                  })
                }}
              />
            </div>

            <div>
              <button type="submit" onClick={handleSubmit}>
                회원가입
              </button>
              <button>취소</button>
            </div>
          </form>
        </center>
      </div>
    </>
  )
}
