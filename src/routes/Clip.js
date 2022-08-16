import React from "react";
import { Link } from "react-router-dom";
import { removeClip } from "../reducer/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import HomeBtn from "../components/HomeBtn";
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

const Clip = () => {
  const clipItems = useSelector((state) => state.newsSlice);
  const dispatch = useDispatch();

  const handleClip = (news) => {
    if (window.confirm("Unclip 하시겠습니까?")) {
      dispatch(removeClip(news));
    }
  };

  return (
    <div>
      <HomeBtn />
      <div>
        {clipItems.clips.map((news) => {
          return (
            <ArticleContainer key={news._id}>
              <Img
                src={
                  news.multimedia.length > 0
                    ? "https://static01.nyt.com/" + news.multimedia[0].url
                    : ""
                }
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
                  {/* Unclip 확인 */}
                  <Button
                    onClick={() => {
                      handleClip(news);
                    }}
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
      </div>
    </div>
  );
};

export default Clip;
