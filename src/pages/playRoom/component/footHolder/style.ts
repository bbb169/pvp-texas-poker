import { css, keyframes } from "@emotion/react";

const breatheBlueBorder = keyframes`
  0% {
    box-shadow: 0 0 20px #00ccff; /* init */
    border-top: 2px solid #00ccff;
  }
  50% {
    box-shadow: 0 0 40px #ff0000; /* larger */
    border-top: 2px solid #ff0000;
  }
  100% {
    box-shadow: 0 0 20px #00ccff;/* init */
    border-top: 2px solid #00ccff;
  }
`;

export const myPlayerCallingAnimation = css`
  animation: ${breatheBlueBorder} 4s ease-in-out infinite;
`


const breatheBackGrount = keyframes`
  0% {
    left: 0;
  }
  50% {
    left: -200%;
  }
  100% {
    left: 0;
  }
`;

export const footHolderBlueBorderBox = (isCalling = false) => css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  ${isCalling ? myPlayerCallingAnimation : ''} 
`

export const footHolderBoxCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;;
  &::before {
    position: absolute;
    content: "";
    display: block;
    width: 300%;
    height: 100%;
    background: linear-gradient(to bottom right, #00ccff, #ff0000);
    animation: ${breatheBackGrount} 8s linear infinite;
  }
`