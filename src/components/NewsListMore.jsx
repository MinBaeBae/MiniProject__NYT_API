import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import NewsListMemo from "./NewsListMemo";
import { addClip, removeClip } from "../reducer/newsSlice";
import { useDispatch, useSelector } from "react-redux";
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

const A = styled.a`
  margin-left: 15px;
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

const LoadingBar = styled.div`
  height: 30px;
  text-align: center;
`;

/* 추가로 불러오는 뉴스 리스트  */
const AddNews = ({ keyword, count, setCount, setLoading }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [newsList, setNewsList] = useState([]);

  const clipItems = useSelector((state) => state.newsSlice);
  const dispatch = useDispatch();

  const handleClip = (news) => {
    if (clipItems.clips.length === 0) {
      dispatch(addClip(news));
    } else {
      if (clipItems.clips.some((data) => data._id === news._id)) {
        dispatch(removeClip(news));
      } else {
        dispatch(addClip(news));
      }
    }
  };

  const getData = async () => {
    const res = await axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&q=${keyword}&page=${count}&api-key=${API_KEY}`
      )
      .then((res) => {
        setLoading(false); // 로딩 끝났으니 loading값 false
        setNewsList([...res.data.response.docs]);
        /* 불러온 뉴스의 길이가 0보다 큰 경우에만 count+1을 준다. 그래야만
        불러올 뉴스가 없는 경우에 뉴스의 길이가 0 이므로 count에 변화가 없어서
        맨 밑에있는 로딩바를 관측해도 추가적으로 뉴스를 불러오지 않는다. */
        if(res.data.response.docs.length > 0) {
          setCount(count + 1); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {newsList.map((news) => {
        return (
          <ArticleContainer key={news._id}>
            {/* 기사 이미지가 있으면 가져온다. 없으면 display:none*/}
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
                {/* 클릭시 사이트 링크로 이동 추가 */}
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
    </div>
  );
};

export default function NewsListMore({ keyword, count, setCount, newsList }) {
  const [news, setNews] = useState([]); // page를 memo하기 때문에 객체의 page에 <AddNews />를 할당해주어야 함.
  const loadingBar = useRef(null);
  const [loading, setLoading] = useState(false);

  // 로딩바가 검색을 하지 않았을 때 바로 관측되기 때문에
  // 검색전에는 관측이되어도 추가로 뉴스를 불러오지 않도록 해야하며
  // 또한 검색을 해도 불러올 뉴스가 없으면 추가로 불러오면 안되게 해야함.
  // 따라서 검색을 하면 count값이 0보다 커지고 불러올 뉴스가 있으면
  // newList의 길이가 0보다 크기 때문에 그 때에만 불러올 수 있도록 함.
  const loadingBarObserver = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (count > 0 && newsList.length > 0) {
          setLoading(true); // 로딩중이라는 뜻
          if (count == 1) {
            setNews([...[]])
          }
          setNews((prev) => [
            ...prev,
            {
              page: (
                <AddNews
                  keyword={keyword}
                  count={count}
                  setCount={setCount}
                  setLoading={setLoading}
                />
              ),
            },
          ]);
        }
      }
    }
  );
  // 맨 밑에 로딩바 관측하는 함수
  const observerOn = () => {
    loadingBarObserver.observe(loadingBar.current);
  };
  // 맨 밑에 로딩바 관측하는 함수를 종료
  const observerOff = () => {
    loadingBarObserver.unobserve(loadingBar.current);
  };
  /* keyword,count,newsList의 최신값을 전달해주어야 하기 때문에
    3개의 값이 바뀔 때마다 맨 밑에 로딩바 감지하는 함수를 호출,
    전에있던 함수 제거 */
  useEffect(() => {
    if(count == 0) {  // count 0되면 검색한 뉴스 리스트 리셋
      setNews([])
    }
    observerOn();
    return () => {
      observerOff();
    };
  }, [keyword, newsList, count]);

  return (
    <div>
      {news.map((news) => (
        <NewsListMemo page={news.page} key={news.page.props.count} />
      ))}
      {/* 로딩중일 때 메세지 출력되도록 함*/}
      <LoadingBar ref={loadingBar}>{loading ? "loading . . ." : ""}</LoadingBar>
    </div>
  );
}
