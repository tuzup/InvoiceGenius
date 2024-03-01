import logo from './logo.svg';
import DashboardLayout from './layout/dashboard';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import Copyright from './components/copyright';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout title={"Quote Generator"}/>
      <Copyright/>
    </ThemeProvider>
  );
}

export default App;
