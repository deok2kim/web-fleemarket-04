import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/globalStyle';
import { BrowserRouter } from 'react-router-dom';
import ToastProvider from './contexts/ToastContext';
import Toast from './components/common/Toast/Toast';
import LoggedInProvider from './contexts/LoggedInContext';
import CustomQueryClientProvider from './components/CustomQueryClientProvider';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalProvider from './contexts/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ToastProvider>
      <CustomQueryClientProvider>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <GlobalStyle />
            <LoggedInProvider>
              <App />
              <Toast />
            </LoggedInProvider>
          </ModalProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </CustomQueryClientProvider>
    </ToastProvider>
  </BrowserRouter>,
);
