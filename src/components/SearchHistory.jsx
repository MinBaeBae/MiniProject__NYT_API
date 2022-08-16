import React from "react";
import styled from "styled-components";

const HistoryContainer = styled.div`
  top: 81px;
  padding: 18px;
  position: absolute;
  display: block;
  background-color: white;
  width: 80%;
  border: 1px solid black;
  margin-left: 60px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
const HeaderContainer = styled.div`
  overflow: hidden;
`;
const Title = styled.span`
  float: left;
  font-weight: 400;
  color: #666;
`;

const ListContainer = styled.ul`
  margin: 10px 0;
`;

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const RemoveButton = styled.button`
  float: right;
  padding: 3px 5px;
  border-radius: 15px;
  border: 1px solid #0bde8b;
  background-color: white;
  font-weight: 300;
`;

const Keyword = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

function History({ keywords, onRemoveKeyword, onClearKeywords }) {
  // keywords는 부모에게 받아오는 저장된 검색값
  // on Remove Keyword는 저장된 값을 지우는 역할
  // on Clear Keyword는 전체삭제 하기 위한 역할
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveButton onClick={onClearKeywords}>전체삭제</RemoveButton>
      </HeaderContainer>
      <ListContainer>
        {/* 5개로 제한  */}
        {keywords.slice(0, 5).map(({ id, text }) => {
          return (
            <KeywordContainer key={id}>
              <Keyword>{text}</Keyword>
              <RemoveButton
                //눌렸을때 해야하는거라 arrow function을 사용하여 실행
                //그냥 함수 쓰면은 그려지자마자 바로 실행됨
                onClick={() => {
                  onRemoveKeyword(id);
                }}
              >
                삭제
              </RemoveButton>
            </KeywordContainer>
          );
        })}
      </ListContainer>
    </HistoryContainer>
  );
}

export default History;
