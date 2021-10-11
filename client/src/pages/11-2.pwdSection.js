import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components'

const StyledPwdChangeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const StyledPwdInputsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledPwdFieldset = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  // & > p {
  //   font-weight: bold;
  // }
`;

const StyledList = styled.li`
  list-style-type: disc;
  flex-direction: column;
  font-size: 0.8rem;
  color: #de0f00;
  background-color: transparent;
  margin: 0;
`;

export default function PasswordChange() {
  // input states
  const [ inputs, setInputs ] = useState({
    curPwd: "",
    newPwd: ""
  })
  const { curPwd, newPwd } = inputs;

  // input onChange event
  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name] : e.target.value
    });
  }

  // TODO old pwd validity check states
  const [ curPwdValidity, setCurPwdValidity ] = useState({
    isCurPwdInput: false,
    isCurWrong: true
  });
  const { isCurPwdInput, isCurWrong } = curPwdValidity;
  // TODO curPwd 중복 검사 (axios 필요)

  // new pwd validity check states
  const [ newPwdValidity, setNewPwdValidity ] = useState({
    isNewPwdInput: false,
    isTooShort: true,
    isTooLong: false,
    isAllNumbers: false,
    isAllAlphabets: false
  });

  useEffect(() => {
    function getValidity(str) {
      // 비밀번호 유효성 검사용 정규식
      const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/; // 비밀번호 전체
      const regOnlyNumber = /^[0-9]/; // 숫자만
      const regOnlyAlphabets = /^[a-zA-Z]*$/; // 문자만

      // newPwd 유효성검사
      if (str.length > 0) {
        setNewPwdValidity({ ...newPwdValidity, isNewPwdInput: true });
        const isValidPwd = regPassword.test(str);

        if (isValidPwd) {
          console.log('검사 통과');
        } else {
          let isOnlyNumber = regOnlyNumber.test(str);
          let isOnlyAlphabets = regOnlyAlphabets.test(str);
          if (isOnlyNumber) {
            console.log('문자를 포함해야 함');
            setNewPwdValidity({ ...newPwdValidity, isAllNumbers: true, isAllAlphabets: false });
          } else if (isOnlyAlphabets) {
            console.log('숫자를 포함해야 함');
            setNewPwdValidity({ ...newPwdValidity, isAllAlphabets: true, isAllNumbers: false });
          }
        }
      }
    }
    getValidity(newPwd);
  }, [newPwd]);

  // button event
  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log('비밀번호 변경 버튼 동작 확인')
  }

  return (
    <div className="passwordChangeComponent" style={{border: '1px solid red'}}>
      <StyledPwdChangeSection>
        <StyledPwdInputsArea>
          <StyledPwdFieldset>
            <h3 className="inputTitle">현재 비밀번호</h3>
            <input
              type='password'
              name='curPwd'
              placeholder='현재 비밀번호를 입력하세요'
              value={curPwd}
              onChange={handleOnChange}
            />
            <ul className="validityRequirements">
              { curPwd.length === 0 ? <StyledList>현재 비밀번호를 입력하세요.</StyledList> : '' }
            </ul>
          </StyledPwdFieldset>
          <StyledPwdFieldset>
            <h3 className="inputTitle">새 비밀번호</h3>
            <input
              type='password'
              name='newPwd'
              placeholder='원하는 비밀번호를 입력하세요'
              value={newPwd}
              onChange={handleOnChange}
            />
            <ul className="validityRequirements">
              {newPwd.length !== 0 ? '' : <StyledList>비밀번호를 입력해주세요</StyledList>}
              {newPwd.length < 4 ? <StyledList>4자 이상 입력해야 합니다.</StyledList> : ''}
              {newPwd.length > 15 ? <StyledList>15 이하로 입력해야 합니다.</StyledList> : ''}
              {/* {
                (newPwd) => {
                  const regOnlyNumber = /^[0-9]/; // 숫자만
                  regOnlyNumber.test(newPwd) ? 
                    <StyledList>문자를 포함해야 합니다.</StyledList>
                  :
                    '';
                }
              }
              {
                (newPwd) => {
                  const regOnlyAlphabets = /^[a-zA-Z]*$/; // 문자만
                  regOnlyAlphabets.test(newPwd) ?
                    <StyledList>숫자를 포함해야 합니다.</StyledList>
                  :
                    '';
                }
              } */}
            </ul>
          </StyledPwdFieldset>
        </StyledPwdInputsArea>
        <div>
          <button onClick={handleButtonClick}>확인</button>
        </div>
      </StyledPwdChangeSection>
    </div>
  );
}