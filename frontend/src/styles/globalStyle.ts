import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
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
  button
  {
    font: inherit;
  }

`;
