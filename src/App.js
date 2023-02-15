import { createContext, useContext, useEffect, useState } from 'react';
// routes
import { Route,Router, Routes, useNavigate} from 'react-router-dom';
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
  const navigate=useNavigate()
   const [loginSuccess,setLoginSuccess]=useState()
useEffect(() => {
        var login=sessionStorage.getItem("login")
        setLoginSuccess(login)
        if(!login){
           navigate('/login')
           localStorage.removeItem("login")
        }
    }, [])
    

  return (
    <UserDataProvider>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      {loginSuccess?<RouterComponent/>:
      <Routes>
          <Route  path="/login" element={<LoginPage/>}/>
      </Routes>
}
    </ThemeProvider>
    </UserDataProvider>
  );
}
