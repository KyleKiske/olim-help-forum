import './App.css';
import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Replies from './components/Replies';
import Nav from './components/Nav';
import { Auth } from "./auth/Auth";

export const AppContext = createContext(null);

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/register' element={<Register />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/:id/replies' element={<Replies />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
