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
  list-style-type: none;
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
  const [ typeErrorMessage, setTypeErrorMessage ] = useState('');
  const [ isNewPwdValid, setIsNewPwdValid ] = useState(false);

  useEffect(() => {
    // 비밀번호 유효성 검사용 정규식
    const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/; // 비밀번호 전체
    // newPwd 유효성검사
    const isValidPwd = regPassword.test(inputs.newPwd);

    const isIncludingBothTypes = (str) => {
      const regOnlyNumber = /^[0-9]/; // 숫자만
      const regOnlyAlphabets = /^[a-zA-Z]*$/; // 문자만
      let isOnlyNumber = regOnlyNumber.test(str);
      let isOnlyAlphabets = regOnlyAlphabets.test(str);
      if (isOnlyNumber || isOnlyAlphabets) {
        setTypeErrorMessage('문자와 숫자를 모두 사용해야 합니다')
      } else {
        setTypeErrorMessage('')
      }
    }

    if (isValidPwd) {
      setIsNewPwdValid(true);
    } else {
      setIsNewPwdValid(false);
      isIncludingBothTypes(inputs.newPwd);
    }
  }, [inputs.newPwd]);

  // 새 비밀번호 유효성 렌더링용 함수 - 정규식 이용
  

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
              {newPwd.length !== 0 ? '' : <StyledList>새 비밀번호를 입력하세요.</StyledList>}
              {newPwd.length < 4 ? <StyledList>4자 이상 입력해야 합니다.</StyledList> : ''}
              {newPwd.length > 15 ? <StyledList>15 이하로 입력해야 합니다.</StyledList> : ''}
              <StyledList>{typeErrorMessage}</StyledList>
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