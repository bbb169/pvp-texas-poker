import { css } from "@emotion/react"

export const cardTopLeftCornerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25%;
  width: calc(1/6 * 100%);
`

export const cardCenterFoutShapeCss = css`
  width: calc(2/3 * 100%);
  height: 70%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%,0);
`

export const cardBottomRightCornerCss = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 25%;
`

export const cardBottomRightCornerContentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(1/6 * 100%);
  height: 100%;
  transform: rotate(180deg);
`