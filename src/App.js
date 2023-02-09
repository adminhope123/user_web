import { createContext, useEffect, useState } from 'react';
// routes
import { Route,Router, Routes} from 'react-router-dom';
import RouterComponent from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import LoginPage from './pages/LoginPage';

// ----------------------------------------------------------------------

export const UserData =createContext();
export default function App() {
  const [userGetData,setUserGetData]=useState()

  useEffect(() => {
    userGetDataFunction()
  }, [])
  
  const userGetDataFunction=()=>{
    const getData=JSON.parse(sessionStorage.getItem("userData"))
   setUserGetData(getData)
    console.log("getData",getData)
  }
  return (
    <UserData.Provider value={{userGetData}}>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <RouterComponent />
      <Routes>
          <Route  path="/login" element={<LoginPage/>}/>
      </Routes>
    </ThemeProvider>
    </UserData.Provider>
  );
}
