import { Button, Typography, Grid, TextField, Container, CssBaseline, Box, Avatar } from '@mui/material';
import Link from '@mui/material/Link';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/register", {
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
                            <LockPersonOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Grid>
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
                                sx={{ mt: 3, mb: 2, bgcolor: "secondary.main"}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
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


export default Register;