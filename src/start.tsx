import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reboot } from 'styled-reboot';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Container
import App from 'containers/App';

// Theme
import { theme } from 'theme';

// Fonts
import SFProDisplayWoff from 'assets/fonts/SFProDisplay.woff';
import SFProDisplayWoff2 from 'assets/fonts/SFProDisplay.woff2';
import BikoBoldWoff from 'assets/fonts/BikoBold.woff';
import BikoBoldWoff2 from 'assets/fonts/BikoBold.woff2';

const GlobalStyle = createGlobalStyle`
  ${reboot}

  html {
    height: -webkit-fill-available;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    min-height: 100vh;
    min-height: -webkit-fill-available;
    margin: 0;
    display: flex;

    @font-face {
        font-family: 'SFProDisplay';
        src: local('SFProDisplay'), local('SFProDisplay'),
        url(${SFProDisplayWoff2}) format('woff2'),
        url(${SFProDisplayWoff}) format('woff');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
      font-family: 'Biko';
      src: local('BikoBold'), local('BikoBold'),
      url(${BikoBoldWoff2}) format('woff2'),
      url(${BikoBoldWoff}) format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }

    input {
      appearance: none;
    }
    select, input {
      font-size: 1rem;
    }
  }

  #root {
    flex: 1;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const Start = () => (
  <ThemeProvider theme={theme}>
    <Helmet titleTemplate="%s - Virufy" defaultTitle="Virufy" />
    <GlobalStyle />
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

export default Start;
