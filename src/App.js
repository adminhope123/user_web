import { createContext, useContext, useEffect, useState } from 'react';
// routes
import { Route,Router, Routes} from 'react-router-dom';
import RouterComponent from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import LoginPage from './pages/LoginPage';
import { UserDataProvider } from './UserDataContext';

// ----------------------------------------------------------------------


export default function App() {

  useEffect(() => {
  }, [])

  return (
    <UserDataProvider>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <RouterComponent />
      <Routes>
          <Route  path="/login" element={<LoginPage/>}/>
      </Routes>
    </ThemeProvider>
    </UserDataProvider>
  );
}
