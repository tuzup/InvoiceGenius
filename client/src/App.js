import logo from './logo.svg';
import DashboardLayout from './layout/dashboard';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import Copyright from './components/copyright';
import QuoteGenerator from './components/QuoteGenerator';
import Router from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
