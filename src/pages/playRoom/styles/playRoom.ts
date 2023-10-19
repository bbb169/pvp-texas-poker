import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const palyRoomPageCss = css`
  width: 100%;
  height: 100%;
  position: relative;
`;
// =================  palyGroundCss ================
export const palyGroundCss = css`
  height: 100%;
  width: 100%;
  background: radial-gradient(circle, #07b707 10%, black 90%);
  padding-bottom: 20%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const playGroundTopUsersBoxCss = css`
  width: 100%;
  height: 20%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  color: white;
`;

export const CardsFlexBoxDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  margin-bottom: 20px;
  padding-right: calc(100px - 80%/5);
  color: black;
`;

// ========================= float buttons ===============

export const getFloatCss = (isRight = false, level = 0) => css`
  position: absolute;
  top: calc(${level * 32}px + ${level}vh + 2vh);
  ${isRight ? 'right' : 'left'}: 4vw;
  z-index: 999;
`;