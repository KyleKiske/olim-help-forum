import './App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Replies from './components/Replies';
import Thread from './components/Thread';
import Nav from './components/Nav';
import { Auth } from "./auth/Auth";
import axios from "axios";

export const AppContext = createContext(null);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const App = () => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: null,
    username: "",
    email: "",
    avatar: ""
  })

  useEffect(() => {
    fetchUserInfo();
  }, [token])

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/info");
      const data = response.data;
      setUserInfo({
        user_id: data[0].user_id,
        username: data[0].username,
        email: data[0].email,
        avatar: data[0].avatar
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AppContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      {token && <Auth><Nav/></Auth>}
      <div className="App">
        <Routes>
          {token ? (
            <>
              <Route path='/dashboard' element={ <Auth><Home title='Home'/></Auth>} />

              <Route path='/users/login' element={<Login />} />
              <Route path='/users/register' element={<Register />} />
              <Route path='/:id/replies' element={<Replies />} />
            </>
          ) : (
            <>
              <Route path='/thread' element={<Thread />}  />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Home />} />
              <Route path='/:id/replies' element={<Replies />} />
            </>
          )}
        </Routes>
      </div>
      <Copyright/>
    </AppContext.Provider>
  );
}

export default App;
