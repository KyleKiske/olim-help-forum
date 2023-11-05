import Button from '@mui/material/Button';
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import axios from "axios";

import { AppContext } from "../App";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);

    let config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const handleSubmit = async () => {
        console.log(1231321);
        try {
            const res = await axios.post("http://localhost:4000/users/login", {
              email,
              password,
            });
            if (res.status === 200) {
              console.log(res.data);
              setToken(res.data);
              navigate("/dashboard");
            }
          } catch (err) {
            console.log("Error");
          }
    };

    // const loginUser = () => {
    //     axios.post("http://localhost:4000/users/login", {
    //             email,
    //             password,
    //         }, config)
    //         .then((data) => {
    //             if (data.error_message) {
    //                 alert(data.error_message);
    //             } else {
    //                 alert("Logged in successfully");
    //                 setToken(res.data);
    //                 navigate("/dashboard");
    //             }
    //         })
    //         .catch((err) => console.error(err));
    // };
    

    return (
        <main className='login'>
            <h1 className='loginTitle'>Log into your account</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='oitlined' onClick={handleSubmit}>SIGN IN</Button>
                <p>
                    Don't have an account? <Link to='/users/register'>Create one</Link>
                </p>
            </form>
        </main>
    );
};

export default Login;