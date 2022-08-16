import React, { useState, useEffect, useRef } from "react";
import NewsList from "./NewsList";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";

function MainContainer() {
  //string은 map을 사용 할 수 없기때문에 object 형태로 변환 시키기 위해 parsing을 해줘야함
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem("keywords") || "[]")
  );
  //keyword에 변화가 일어날때만 랜더링
  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  //input focus일때 항상 true값을 줌
  const focusSearch = () => {
    setClickInput(true);
  };

  //focus를 벗어나는 클릭을 했을때 false값을 주기
  const [clickInput, setClickInput] = useState(false);

  const searchInputRef = useRef(null);
  //focus가 벗어나는 변화를 감지
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setClickInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  //검색어 추가 및 유니크 id 부여
  const handleAddKeyword = (text) => {
    if (text.trim().length > 0) {
      const newKeyword = {
        id: Date.now(),
        text: text.trim(),
      }

      //중복되는 keyword값을 제거해준다.
      setKeywords([
        newKeyword,
        ...keywords.filter((e) => e.text !== text.trim()),
      ]);
    }
  }

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => thisKeyword.id !== id);
    setKeywords(nextKeyword);
  };

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };

  const [keyword, setKeyword] = useState("");

  //keywords = 검색어 이력
  //searchInputRef= focus on off 감지

  return (
    <>
      <div ref={searchInputRef}>
        {/* 검색란 */}
        <SearchBar
          focusSearch={focusSearch}
          keyword={keyword}
          setKeyword={setKeyword}
        ></SearchBar>
        {clickInput && keywords.length !== 0 && (
          /* 최근 검색어 */
          <SearchHistory
            keywords={keywords}
            onClearKeywords={handleClearKeywords}
            onRemoveKeyword={handleRemoveKeyword}
          />
        )}
      </div>
      <NewsList onAddKeyword={handleAddKeyword} keyword={keyword} setKeyword={setKeyword} />
    </>
  );
}

export default MainContainer;
