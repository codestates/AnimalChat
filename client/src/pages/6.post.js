import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"

// const Input = styled.input.attrs({ type: "text" })`
//   /* padding: 50px; */
//   margin: 0px;

//   width: 150px;
//   height: 150px;
//   background-color: #fdf7c5;
// `

const Container = styled.div`
  box-sizing: border-box;
  width: 1920px;
  height: 1080px;
  background-color: #ffe2cd;
`
const Header = styled.div`
  padding-bottom: 0.5em;
  padding-left: 0.5em;
  padding-top: 0.5em;

  font-size: 6em;
  text-align: left;
  color: palevioletred;
  background: #fdf7c5;
`
const Box = styled.div`
  /* padding: -120px; */
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1800px;
  height: 750px;

  background-color: #fdf7c5;
`
const PhotoBox = styled.div`
  /* padding: 50px; */
  margin: 0px;

  width: 650px;
  height: 650px;
  background-color: #e0e0e0;
`
const TitleBox = styled.div`
  /* padding: 630px; */
  margin: 60px;
  width: 1800px;
  height: 750px;

  background-color: #e0e0e0;
`
const ContentBox = styled.div`
  /* padding: 630px; */
  margin: 60px;
  width: 1800px;
  height: 750px;

  background-color: #e0e0e0;
`

export const Post = (props) => {
  //   const history = useHistory()

  return (
    <div>
      <Container>
        <Header>Animal Chat🐣</Header>
        <Box>
          <PhotoBox>asd</PhotoBox>
        </Box>
      </Container>
    </div>
  )
}
{
  /* <TitleBox></TitleBox>
          <ContentBox></ContentBox> */
}

export default Post
