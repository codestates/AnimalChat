/* eslint-disable */
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

axios.defaults.withCredentials = true

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #fff9ee;
`

const FormSpace = styled.div`
    min-width: 300px;
    width: 50vw;
    background-color: #FFFFFF;
    border-radius: 20px;
`

const PageTitle = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

const InputsSection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem auto;

    & h3 {
        margin-bottom: 0.5rem;
    }
`

const SingleInputSection = styled.div`
    margin: 0.3rem auto;
    & p {
        font-weight: bold;
    }
    & input {
        margin: 0.25rem auto;
        padding: 0.25rem;
        width: 10rem;
    }
    & select {
        margin: 0.25rem auto;
        padding: 0.25rem;
        width: 10rem;
    }
    & div.validityWarning {
        color: red;
        font-size: 0.8rem;
    }
`

const ButtonsArea = styled.div`
    margin: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;

    & button {
        padding: 0.5rem;
        border-radius: 10px;
        border: none;
        background-color: #e00000;
        color: white;
        font-size: 1.1rem;
        font-weight: bold;
    }

    .buttons {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        width: 40%;
        @media screen and (max-width: 450px) {
            width: auto;
        }
    }

    #submitBtn {
        background-color: #588156;
        border: 1px solid #588156;
        color: #FFFFFF;
        margin-right: 1rem;
        width: 50%;
        @media screen and (max-width: 450px) {
            width: auto;
        }
    }
    #cancleBtn {
        background-color: #FFFFFF;
        border: 1px solid #588156;
        color: #588156;
    }
`

// let url = process.env.REACT_APP_API_URL
// if(!url) url = "http://ec2-13-209-35-203.ap-northeast-2.compute.amazonaws.com"
let url = "http://ec2-13-209-35-203.ap-northeast-2.compute.amazonaws.com"

export default function Signup(props) {    
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        userId: "",
        password: "",
        nickName: "",
        animalName: "",
        selectType: "",
        animalYob: "",
    })

    const { userId, password, nickName } = userInfo

    const handleInputValue = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    // ???????????? type ??????
    const selectList = [
        "???????????????",
        "?????????",
        "?????????",
        "?????????",
        "??????",
        "????????????",
    ]
    const [Selected, setSelected] = useState("???????????????")

    const handleSelect = (e) => {
        setSelected(e.target.value)
        setUserInfo({
            ...userInfo,
            selectType: e.target.value,
        })
    }

    // ???????????? ????????????
    const [startDate, serStartDate] = useState(new Date())

    function dateFormat(date) {
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month >= 10 ? month : "0" + month
        day = day >= 10 ? day : "0" + day

        return date.getFullYear() + "." + month + "." + day
    }

    // userId ???????????????
    const [userCheck, setUserCheck] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [nickNameCheck, setNickNameCheck] = useState(false)

    // ????????? ?????? (?????????, ????????????, ?????????) , ?????? ????????? ????????? ?????? ??????
    let regUserId = /^[a-zA-z0-9]{6,12}$/ // ?????????
    let regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/ // ????????????
    let regNickName = /^[???-???|???-???|a-z|A-Z|0-9|]{2,15}$/ // ?????????, 2 ~ 15??? ??????, ??????, ??????

    // ?????????
    useEffect(() => {
        if (userId) {
            const checkId = regUserId.test(userId)

            if (checkId) {
                setUserCheck(true)
            } else {
                setUserCheck(false)
            }
        }
    }, [userId])

    // ????????????
    useEffect(() => {
        if (password) {
            const checkPassword = regPassword.test(password)

            if (checkPassword) {
                setPasswordCheck(true)
            } else {
                setPasswordCheck(false)
                // ????????????????????? ????????? ?????????
            }
        }
    }, [password])

    // ?????????
    useEffect(() => {
        if (nickName) {
            const checkNickName = regNickName.test(nickName)

            if (checkNickName) {
                setNickNameCheck(true)
            } else {
                setNickNameCheck(false)
                // ????????????????????? ????????? ?????????
            }
        }
    }, [nickName])

    // * ???????????? ????????? ?????????, ???????????? ???????????? ???????????? : ????????? ?????????????????? ???????????? ????????? ???????????? ??????????????? ?????? ?????????????????? ????????????

    // ???????????? ??????
    const handleSubmit = () => {
        if (
            userCheck &&
            passwordCheck &&
            nickNameCheck &&
            Selected !== "???????????????" &&
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
                    alert("???????????? ??????")
                    props.SignUpFin()
                } else if (res.status === 202) {
                    alert("????????? ???????????????.")
                } else if (res.status === 203) {
                    alert("????????? ???????????????.")
                }
            })
        } else {
            // ???????????? ????????????
            alert("?????? ????????? ???????????????.")
        }
    }

    return (
        <Outer>
            <FormSpace>
                <PageTitle>????????????</PageTitle>
                <StyledForm onSubmit={(e) => e.preventDefault()}>
                    <InputsSection className="humanInputs">
                        <h3>?????? ??????</h3>

                        <SingleInputSection>
                            <p>?????????</p>
                            <input
                                type="userId"
                                name="userId"
                                placeholder="6 ~ 12???, ?????? ?????? ??????"
                                onChange={handleInputValue}
                            />
                            {userCheck ? null : (
                                <div className="validityWarning">
                                    ????????? ????????? ???????????? ????????????.
                                </div>
                            )}
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>????????????</p>
                            <input
                                autoComplete="off"
                                type="password"
                                name="password"
                                placeholder="4 ~ 15???, ????????? ?????? ??????"
                                onChange={handleInputValue}
                            />
                            {passwordCheck ? null : (
                                <div className="validityWarning">
                                    ???????????? ????????? ???????????? ????????????.
                                </div>
                            )}
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>?????????(2?????? ??????)</p>
                            <input
                                placeholder="2 ~ 15???, ??????, ??????, ??????"
                                type="nickName"
                                name="nickName"
                                onChange={handleInputValue}
                            />
                            {nickNameCheck ? null : (
                                <div className="validityWarning">
                                    ????????? ????????? ???????????? ????????????.
                                </div>
                            )}
                        </SingleInputSection>
                    </InputsSection>

                    <InputsSection className="animalInputs">
                        <h3>???????????? ??????</h3>
                        <SingleInputSection>
                            <p>??????????????? ??????</p>
                            <select onChange={handleSelect} value={Selected}>
                                {selectList.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {Selected !== "???????????????" ? null : (
                                <div className="validityWarning">
                                    ????????? ???????????????.
                                </div>
                            )}
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>??????????????? ??????</p>
                            <input
                                type="animalName"
                                name="animalName"
                                onChange={handleInputValue}
                            />
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>??????????????? ????????????</p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    serStartDate(date)
                                    setUserInfo({
                                        ...userInfo,
                                        animalYob: dateFormat(date),
                                    })
                                }}
                            />
                        </SingleInputSection>
                    </InputsSection>

                    <ButtonsArea>
                        <div className="buttons">
                            <button id="submitBtn" type="submit" onClick={handleSubmit}>
                                ????????????
                            </button>
                            <button id="cancleBtn" onClick={() => history.goBack()}>??????</button>
                        </div>
                    </ButtonsArea>
                </StyledForm>
            </FormSpace>
        </Outer>
    )
}
