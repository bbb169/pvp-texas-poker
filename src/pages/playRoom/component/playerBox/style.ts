import { css, keyframes } from '@emotion/react';

const rippleAnimation = keyframes`
  0% {
    border: 0px solid #ff0000;
    transform: scale(1);
  }
  100% {
    border: 2px solid #ff0000;
    transform: scale(1.5);
  }
`;

export const ripplePlayerBoxCss = css`
  animation: ${rippleAnimation} 1s linear infinite;
`; 

export const UsersBoxFlexCss = (gray = false) => css`
  margin: 0 1vw;
  cursor: pointer;
  filter: ${gray ? 'grayscale(100%)' : ''} 
`;