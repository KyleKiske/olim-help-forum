import { Button, Typography, Grid, TextField, Container, CssBaseline, Box, Avatar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider, createTheme } from '@mui/material';
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import axios from "axios";

import { AppContext } from "../App";

const defaultTheme = createTheme();

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
            const res = await axios.post("/api/users/login", {
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


    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            mt: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        className="register-container"
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                            <LoginIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log into your account
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2}}
                            >
                                Login
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        Don't have an account? Create one!
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Login;