import axios from "axios"
import styled from "styled-components"
import AnimalInfo from "../components/AnimalInfo"
import AddAnimalInfo from "../components/AddAnimalInfo"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const Outer = styled.div`
    background-color: #feefd5;
    height: 100vh;
`

const IdDisplay = styled.div`
    box-sizing: content-box;
    padding: 1rem;
    display: flex;
    justify-content: center;
    // border: 1px solid green;
`

const AnimalsList = styled.div`
    box-sizing: content-box;
    padding: 1rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, 350px);
    justify-content: center;
    align-content: center;
`

const ButtonsArea = styled.div`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    & > button {
        font-size: 1rem;
        background-color: #db7092;
        color: white;
        font-weight: bold;
        box-sizing: content-box;
        margin: 0.5rem;
    }
`

const QuitButton = styled.button`
    background-color: transparent;
    border-radius: none;
    text-decoration: underline;
    border: none;
    color: #aaaaaa;
`

const AddAnimalModalContainer = styled.div`
    box-sizing: content-box;
    padding: 1rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, 350px);
    justify-content: center;
    align-content: center;
`

const AddAnimalModalBackDrop = styled.div`
    position: fixed;
    display: grid;
    place-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`
// 모달창
const AddAnimalModalView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    background-color: #feefd5;
    min-width: 400px;
    width: 19vw;
    height: 30vw;

    & h3 {
        font-size: 1.5rem;
        font-weight: bold;
        color: #bd2020;
        margin-left: 4.5rem;
    }
    & button.close {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        padding: 0.5rem 2rem;
        font-size: 2rem;
        text-decoration: underline;
        color: #7b7b7b;
        border: none;
        background-color: transparent;
    }
`

const ButtonSpace = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const Button = styled.button`
    /* margin: 1rem; */
    margin-top: 2rem;
    margin-right: 5.5rem;
`

const Buttos = styled.button`
    /* margin: 1rem; */
    margin-right: 5rem;
    margin-top: 2rem;
`
const PhotoBoxAndIdDisplay = styled.form`
    // height: 100%;
    // width: 100%;
    // height: 100%;
    // width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // border: 5px solid black;
`

const PhotoBox = styled.img`
    width: 250px;
    height: 250px;

    // display: flex;
    // justify-content: center;
    border-radius: 50%;
    border: 1px solid silver;
`
const PhotoBox2 = styled.div`
    display: flex;
    justify-content: center;
    // border: 1px solid red;

    // flex-direction: column;
    width: 100%;
    height: 100%;
    // border-radius: 50%;
    // align-items: center;
    // box-sizing: content-box;
    // padding: 1rem;
    // display: flex;
    // justify-content: center;
`
const PhotoBox3 = styled.div`
    display: flex;
    justify-content: center;
    // border: 1px solid yellow;
    position: relative;

    // flex-direction: column;
    // width: 200px;
    // height: 200px;
    // border-radius: 50%;
    // align-items: center;
    // box-sizing: content-box;
    // padding: 1rem;
    // display: flex;
    // justify-content: center;
`
const CameraImg = styled.label`
    // max-width: 50%;
    // width: 100%;
    // height: 100%;
    // position: absolute;
    // bottom: 4px;
    // left: 580px;
    position: relative;

    // z-index: 999999;
    // justify-content: center;
    // border-radius: 100%;
`
const CameraImg2 = styled.img`
    // max-width: 100%;
    width: 50px;
    margin-left: 70px;

    position: absolute;
    bottom: 20px;
    // left: 515px;
    background-color: white;
    border-radius: 100%;
    border: 1px solid silver;
`
const DivTag = styled.div`
    // align-items: center;
    align-items: center;
`
// import asd from '../../public/img/image3'
const FormInputTag = styled.input`
    display: none;
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function MyPageSection(props) {
    // console.log(props.userAnimalinfo)
    // console.log(Array.isArray(props.userAnimalinfo))

    const infoAnimal = props.userinfo
    // console.log("마이페이지 animalInfo : ", infoAnimal)

    const [isOpen, setIsOpen] = useState(false)
    const [removeUsers, setremoveUsers] = useState(false)
    const [pwdEdit, setPwdEdit] = useState(false)
    const history = useHistory()

    const [userAnimalinfo, setUserAnimalInfo] = useState([])
    useEffect(() => {
        axios({
            url: url + `/userinfo?serchAnimalInfo=${props.userinfo.user_id}`,
            method: "get",
            withCredentials: true,
        }).then((res) => {
            // console.log(res)
            setUserAnimalInfo(res.data)
        })
    }, [])

    function addAnimal() {
        // console.log("동물추가버튼")
        setIsOpen(!isOpen)
    }

    function deleteUserInfo() {
        setremoveUsers(!isOpen)
    }

    function pwdChange(click) {
        setPwdEdit(!click)
        history.push("/editpw")
    }

    function closeRemoveModal() {
        //취소하기 버튼으로
        setIsOpen(!isOpen)
        history.push("/mypage")
    }

    const removeInfomation = () => {
        axios({
            url: url + "/removeuser",
            method: "delete",
            withCredentials: true,
        }).then((res) => {
            alert("회원탈퇴가 완료되었습니다.")
            history.push("/firstpage")
        })
    }

    // 동물추가 후 모달창 닫히는 함수
    const addButtonHandler = () => {
        // console.log('addButtonHandler 함수실행')
        setIsOpen(false)
        renderreset()
    }
    const renderreset = () => {
        history.push("/")
        history.push("/mypage")
    }
    // 추가 취소
    const cancleButton = () => {
        setIsOpen(false)
    }

    const [photo, setPhoto] = useState("")
    const [uploadedImg, setUploadedImg] = useState({
        fileName: null,
        filePath: null,
    })
    const [formBox, setformBox] = useState("")

    useEffect(() => {
        // onSubmit()
        console.log(photo)
        const formData = new FormData()
        formData.append("img", photo)
        formData.append("user_id", props.userinfo.user_id)

        setformBox(formData)
    }, [photo])
    useEffect(() => {
        // onSubmit()
        console.log(formBox)
        if (formBox !== "") {
            axios
                .post(url + "/profilephoto", formBox, {
                    "Content-Type": "application/json",
                    withCredentials: true,
                })
                .then((res) => {
                    const { fileName } = res.data
                    setUploadedImg({
                        fileName,
                        filePath: `${url}/img/${fileName}`,
                    })
                    props.newUserInfo()
                    alert("사진을 성공적으로 업로드 하였습니다.")
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [formBox])

    const addFile = async (e) => {
        console.log(e.target.files[0])
        await setPhoto(e.target.files[0])
    }
    useEffect(() => {
        setUploadedImg({
            fileName: props.userinfo.profilePhoto,
            filePath: `${url}/img/${props.userinfo.profilePhoto}`,
        })
    }, [])

    return (
        <Outer className="MyPageSection">
            <PhotoBoxAndIdDisplay>
                <PhotoBox2 className="PhotoBox2">
                    <PhotoBox
                        className="PhotoBox1-1"
                        src={uploadedImg.filePath}
                    />
                </PhotoBox2>
                <PhotoBox3>
                    <CameraImg htmlFor="fileId">
                        <CameraImg2 src="../img/camera.png" />
                    </CameraImg>
                </PhotoBox3>
                <IdDisplay>
                    {/* TODO : axios 요청 -> 회원정보 -> id */}
                    <span>{props.userinfo.user_id}</span>
                </IdDisplay>
                <FormInputTag
                    type="file"
                    id="fileId"
                    onChange={addFile}
                ></FormInputTag>
            </PhotoBoxAndIdDisplay>
            <AnimalsList>
                {userAnimalinfo.length ? (
                    userAnimalinfo.map((animalcard) => {
                        return <AnimalInfo animalcard={animalcard} />
                    })
                ) : (
                    <div>정보없음</div>
                )}
            </AnimalsList>
            <ButtonsArea>
                <button onClick={addAnimal}>동물 추가하기</button>
                <button onClick={pwdChange}>비밀번호 수정</button>
                <QuitButton onClick={deleteUserInfo}>회원탈퇴</QuitButton>
            </ButtonsArea>

            {isOpen === false ? null : (
                <AddAnimalModalContainer>
                    <AddAnimalModalBackDrop>
                        <AddAnimalModalView>
                            <AddAnimalInfo
                                infoAnimal={infoAnimal}
                                addButtonHandler={addButtonHandler}
                                cancleButton={cancleButton}
                            >
                                나는 모달
                            </AddAnimalInfo>
                        </AddAnimalModalView>
                    </AddAnimalModalBackDrop>
                </AddAnimalModalContainer>
            )}
            {removeUsers === false ? null : (
                <AddAnimalModalContainer>
                    <AddAnimalModalBackDrop>
                        <AddAnimalModalView onClick={deleteUserInfo}>
                            <div>
                                <h3>회원탈퇴를 하시겠습니까?</h3>
                            </div>
                            <ButtonSpace>
                                <Button onClick={closeRemoveModal}>닫기</Button>
                            </ButtonSpace>
                            <ButtonSpace>
                                <Buttos onClick={removeInfomation}>
                                    탈퇴하기
                                </Buttos>
                            </ButtonSpace>
                        </AddAnimalModalView>
                    </AddAnimalModalBackDrop>
                </AddAnimalModalContainer>
            )}
        </Outer>
    )
}

// id 넣는 부분 : 회원 정보 요청
// 동물 정보 넣는 부분 : axios 요청 받아서 map으로 뿌리기
// 별도 컴포넌트 필요할듯
