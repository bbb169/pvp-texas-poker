import { CardShowFace } from "@/pages/playRoom/type.js";
import { css, keyframes } from "@emotion/react";
import styled from '@emotion/styled';
import { TransitionStatus } from "react-transition-group";


// define CSS key frame animation
export const cardFadeIn = keyframes`
  from {
    transform: rotateY(90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
  }
`;

export const cardFadeOut = keyframes`
  from {
    transform: rotateY(0deg);
    opacity: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0;
  }
`;

export const cardBack = css`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
  45deg,
  #0074e4,
  #0074e4 7px,
  #ffffff 7px,
  #ffffff 14px
  );
  background-size: 20px 20px;
  border: 1px solid #0074e4;
  color: #0074e4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

export const cardFront = css`
  width: 100%;
  height: 100%;
  padding: 4px 2px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  user-select: none;
`

export const cardContainer = (show: boolean) => {
  return css`
    width: 100px;
    height: 150px;
    border: 2px solid #ccc;
    background-color: #fff;
    text-align: center;
    margin: 0 20px;
    border-radius: 10px;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0 20px 5px rgb(255 247 0 / 72%);
    }
    display: ${show? 'block;' : 'none;' }
    animation: ${show ? cardFadeIn : cardFadeOut} 0.5s ease-in-out forwards;
  `
};