import Button from '@mui/material/Button';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // const signUp = () => {
    //     axios.post("/users/register", {
    //         email: email,
    //         password: password,
    //         username: username,
    //     })
    //         .then((data) => {
    //             if (data.error_message) {
    //                 alert(data.error_message);
    //             } else {
    //                 alert("Account created successfully!");
    //                 navigate("/users/login");
    //             }
    //         })
    //         .catch((err) => console.error(err));
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/register", {
                email: email,
                password: password,
                username: username,
            });
            if (res.status === 200) {
                setMessage("");
                console.log("sending email");
                await sendConfirmEmail(email, username);
                navigate("/login");
            }
        } catch (err) {
            setMessage(err.response.data.msg);
        }
        
    };

    const sendConfirmEmail = async (toEmail, toUsername) => {
        try {
            const res = await axios.post("/api/send-email", { to: toEmail, username: toUsername });
            if (res.status === 200) {
                console.log("Email sent");
            }
        } catch (err) {
            console.error("Email sending failed: ", err);
        }
    };
    
    return (
        <main className='register'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <Button 
                    type="submit"
                    variant='contained'
                >
                    REGISTER</Button>
                <p>
                    Have an account? <Link to='/users/login'>Sign in</Link>
                </p>
            </form>
        </main>
    );
};


export default Register;