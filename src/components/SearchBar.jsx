import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 2px solid #0bde8b;
  background-color: #fff;
  padding: 20px 60px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  background-color: #fff;
  font-weight: 700;
  font-size: 20px;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    `
    padding-right: 25px; 
  `}
`;

function SearchBar({ focusSearch, keyword, setKeyword }) {
  //느낌표로 키워드를 갖고있냐 없냐로 boolean 형태로 나옴
  //키워드를 가지고 있다면 active가 발생하여 padding이 발생함. // 패딩이 없으면 x 아이콘까지 글자가 침법하기 때문
  //keyword가 있으면 true, 없으면 false가 리턴이 되는 것을 확인 할 수 있습니다
  const hasKeyword = !!keyword;
  //페이지 첫 로딩시 자동으로 input focus
  const inputRef = useRef(null);
  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setKeyword(e.target.value)}
          active={hasKeyword}
          onFocus={focusSearch}
          ref={inputRef}
        />
      </InputContainer>
    </Container>
  );
}

export default SearchBar;
