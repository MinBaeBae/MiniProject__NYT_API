import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { addClip, removeClip } from "../reducer/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import NewsListMore from "./NewsListMore";
import { format, sub, parseISO } from "date-fns";

const ArticleContainer = styled.div`
  width: 90%;
  margin: 0px auto;
  border-radius: 5px;
  padding: 20px;
  margin-top: 15px;
  text-align: left;
  border: 1px solid black;
  display: flex;
`;

const Img = styled.img`
  width: 300px;
  height: 150x;

  &.empty {
    display: none;
  }
`;
const Article = styled.div`
  padding: 10px;
`;

const A = styled.a`
  margin-left: 15px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid #0bde8b;
  border-radius: 3px;
  background-color: white;
  font-weight: 600;
  transition: 0.2s;

  &.Unclip {
    background-color: #0bde8b;
    color: white;
    transition: 0.2s;
  }
`;

const Date = styled.div`
  margin-bottom: 1.2em;
`;
// onAddKeyword: 검색어 추가 function
// keyword: 검색어
const NewsList = ({ onAddKeyword, keyword }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const getData = async () => {
    setLoading(true);
    const res = await axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&q=${keyword}&page=${count}&api-key=${API_KEY}`
      )
      .then((res) => {
        setNewsList([...res.data.response.docs]);
        setLoading(false);
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // store 에서 clipItems 값 반환
  const clipItems = useSelector((state) => state.newsSlice);
  const dispatch = useDispatch();

  const handleClip = (news) => {
    // 첫 번째 클립 추가
    if (clipItems.clips.length === 0) {
      dispatch(addClip(news));
    } else {
      // 첫 번째 이후
      if (clipItems.clips.some((data) => data._id === news._id)) {
        // 이미 추가한 거면 해제
        dispatch(removeClip(news));
      } else {
        // 클립 리스트에 없으면 새로 추가
        dispatch(addClip(news));
      }
    }
  };
  useEffect(() => {
    // 입력이 변경될때 마다 count를 0으로 만들어 0페이지 출력
    if (keyword === keyword.trim()) {
      setCount(0);
      if (onAddKeyword && keyword !== "") {
        // 검색어가 공란이 아니고
        const timer = setTimeout(() => {
         if (!loading) {
           // api 요청하고 결과값이 받아지면
           getData();
           onAddKeyword(keyword); // 검색어 저장을 한다
          }
       }, 500); // 입력 후 0.5초가 지나면
       return () => {
         clearTimeout(timer);
       };
     }
   }
  }, [keyword]);

  return (
    <div>
      {newsList.map((news) => {
        return (
          <ArticleContainer key={news._id}>
            {/* 이미지가 없는 경우가 있어서 없으면 display:none */}
            <Img
              src={
                news.multimedia.length > 0
                  ? "https://static01.nyt.com/" + news.multimedia[0].url
                  : ""
              }
              className={news.multimedia.length > 0 ? "" : "empty"}
            />
            <Article>
              <h2>{news.headline.main}</h2>
              <p>{news.abstract}</p>
              <Date>
                {format(
                  sub(parseISO(news.pub_date), { hours: 9 }),
                  "yyyy년 M월 d일 H:mm"
                )}
              </Date>
              <div>
                {/* clip되었을 때 활성화 */}
                <Button
                  onClick={() => handleClip(news)}
                  className={
                    clipItems.clips.some((data) => data._id === news._id)
                      ? "Unclip"
                      : "Clip"
                  }
                >
                  {clipItems.clips.some((data) => data._id === news._id)
                    ? "Unclip"
                    : "Clip"}
                </Button>
                <Button
                  onClick={() => window.open(`${news.web_url}`, "_blank")}
                >
                  See Detail
                </Button>
              </div>
            </Article>
          </ArticleContainer>
        );
      })}
      {/* 스크롤바닥에 닿을시 기사 더 가져오는 컴포넌트 */}
      <NewsListMore
        keyword={keyword}
        count={count}
        setCount={setCount}
        newsList={newsList}
      />
    </div>
  );
};

export default NewsList;
