import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const bodyStyle = css`
  body {
    font-family: 'Noto Sans KR', sans-serif;

    position: relative;
    height: 100vh;
    max-width: 768px;
    margin: 0 auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
	${reset}
  ${bodyStyle} 

  * {
    box-sizing: border-box;
  }
	ol, ul, li {
		list-style: none;
	}
	button {
    background: none;
    background-color: transparent;
    border: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  img {
    -webkit-user-drag: none;
  }
	input,
  button,
  textarea
  {
    font: inherit;
  }

  #root {
    height: 100%;
    overflow: hidden;
  }
`;
