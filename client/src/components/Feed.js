import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Stack } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { AppContext } from "../App";

const Feed = (props) => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    };

    return (
        <Stack spacing={1}>
            <Button component={Link} to="/dashboard">
                Home
            </Button>
            <Button component={Link} to="/users/login">
                Login
            </Button>
            <Button component={Link} to="/users/register">
                Register
            </Button>
            <Button component={Link} to="/profile">
                <AccountBoxIcon/> <span style={{ marginLeft: "20px" }}>Profile</span>
            </Button>
            {/* <Button onClick={logout}>Logout</Button> */}
        </Stack>
    );
};

export default Feed;