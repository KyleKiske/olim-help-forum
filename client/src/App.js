import './App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useState, createContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Replies from './components/Replies';
import Thread from './components/Thread';
import Forum from './components/Forum';
import Article from './components/Article';
import { ArticleAndThreadWriter, ReplyWriter } from './components/Writer';
import { ArticleWriter } from './components/ArticleWriter';
// import ReplyWriter from './components/WriteArticle';
import Nav from './components/Nav';
import { Auth } from "./auth/Auth";
import axios from "axios";

export const AppContext = createContext(null);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Olim helper
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const App = () => {
  const [token, setToken] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: null,
    username: '',
    email: '',
    avatar: ''
  })

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);
    fetchUserInfo();
  }, [token, uploaded])

  const fetchUserInfo = async () => {
    try { 
      const response = await axios.get("/api/users/userinfo"); 
      const data = response.data;
      setUserInfo({
        user_id: data.id,
        username: data.username,
        email: data.email,
        avatar: data.avatar
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AppContext.Provider value={{ token, setToken, userInfo, setUserInfo, uploaded, setUploaded }}>
      {token && <Auth><Nav /></Auth>}
      <Routes>
        {token ? (
          <>
            <Route path='/dashboard' element={ <Auth><Home title='Home'/></Auth>} />
            <Route path='/:id/replies' element={ <Auth><Replies /></Auth>} />
            <Route path='/profile' element={ <Auth><Profile /></Auth>} />
            <Route path='/forum' element={ <Auth><Forum /></Auth>} />
            <Route path='/:id/replies' element={ <Auth><Replies /></Auth>} />
            <Route path='/threads/:id' element={ <Auth><Thread /></Auth>} />
            <Route path='/article/:id' element={ <Auth><Article /></Auth>} />
            <Route path='/article/new' element={ <Auth><ArticleAndThreadWriter /></Auth>} />
            <Route path='/reply/new' element={ <Auth><ReplyWriter /></Auth>} />
            <Route path='/articleWriter' element={ <Auth><ArticleWriter /></Auth> } />
            <Route path='/editor' element={<Auth></Auth>} />
          </>
        ) : (
          <>
            {/* <Route path='/article/new' element={ <ArticleAndThreadWriter moduleChoice="modulesArticle" />} /> */}
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register title="Register" />} />
            
          </>
        )}
      </Routes>
      <Box sx={{ mt: "5px" }}>
        <Copyright/>
      </Box> 
      
    </AppContext.Provider>
  );
}

export default App;
