import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeImg from "../assets/home.png";
import HomeImgOver from "../assets/homeOver.png";
import PinImg from "../assets/pin.png";
import PinImgOver from "../assets/pinOver.png";
import observerOff from "./NewsListMore";

const Nav = styled.nav`
  position: relative;
  left: 30px;
  top: 8px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url(${HomeImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:hover {
    background-image: url(${HomeImgOver});
    transition: 0.3s;
  }
`;
const ClipLink = styled(Link)`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url(${PinImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:hover {
    background-image: url(${PinImgOver});
    transition: 0.3s;
  }
`;

const HomeBtn = () => {
  return (
    <Nav>
      <HomeLink to="/"></HomeLink>
      <ClipLink to="/Clip" onClick={() => observerOff()}></ClipLink>
    </Nav>
  );
};

export default HomeBtn;
