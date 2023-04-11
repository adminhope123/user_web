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
import ForgotPassword from './sections/auth/login/ForgotPassword';

// ----------------------------------------------------------------------


export default function App() {
  const navigate=useNavigate()
   const [loginSuccess,setLoginSuccess]=useState()
useEffect(() => {
        var login=localStorage.getItem("loginData")
        setLoginSuccess(login)
        if(!login){
           navigate('/login')
           localStorage.removeItem("/loginData")
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
          {/* <Route  path="/forgotpassword" element={<ForgotPassword/>}/> */}
      </Routes>
}
    </ThemeProvider>
    </UserDataProvider>
  );
}
