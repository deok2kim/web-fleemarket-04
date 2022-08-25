import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalStyle } from './styles/globalStyle';
import { BrowserRouter } from 'react-router-dom';
import ToastProvider from './contexts/ToastContext';
import Toast from './components/common/Toast/Toast';
import LoggedInProvider from './contexts/LoggedInContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastProvider>
        <LoggedInProvider>
          <BrowserRouter>
            <App />
            <Toast />
          </BrowserRouter>
        </LoggedInProvider>
      </ToastProvider>
      <ReactQueryDevtools />
    </ThemeProvider>
  </QueryClientProvider>,
);
