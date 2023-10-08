import { css } from "@emotion/react"

export const UsersBoxFlexCss = (gray = false) => css`
  margin: 0 1vw;
  cursor: pointer;
  filter: ${gray ? 'grayscale(100%)' : ''} 
`