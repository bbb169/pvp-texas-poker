import { css, keyframes } from "@emotion/react";


// define CSS key frame animation
export const cardFadeIn = keyframes`
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
`;

export const cardFadeOut = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
`;

const cardContentPublic = `
  width: 100px;
  height: 150px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 20px 5px rgb(255 247 0 / 72%);
  }
`

export const cardBack = css`
  ${cardContentPublic}
  background: repeating-linear-gradient(
  45deg,
  #0074e4,
  #0074e4 7px,
  #ffffff 7px,
  #ffffff 14px
  );
  background-size: 20px 20px;
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
  ${cardContentPublic}
  padding: 4px 2px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  user-select: none;
`

export const cardContainer = (show: boolean, animation: boolean) => {
  return css`
    width: 100px;
    height: 150px;
    position: absolute;
    box-sizing: border-box;
    ${animation ? css`animation: ${show ? cardFadeIn : cardFadeOut} 0.5s ease-in-out forwards;` : ''}
  `
};