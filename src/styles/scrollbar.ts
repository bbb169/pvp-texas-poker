export const customScrollBar = (width = '8px', normalColor = 'rgba(0,0,0,.35)', darkColor = 'rgba(0,0,0,.8)') => `
  cursor: pointer;
  ::-webkit-scrollbar {
    width: ${width};
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${normalColor};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${darkColor};
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;