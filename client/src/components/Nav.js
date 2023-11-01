import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import {Button, Stack} from "@mui/material";
import "./Nav.css";

import { AppContext } from "../App";

const Nav = (props) => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    };

    return (
        <Stack spacing={2} direction={"row"}>
            <Button component={Link} to="/dashboard">
                Home
            </Button>
            <Button component={Link} to="users/login">
                Login
            </Button>
            <Button component={Link} to="users/register">
                Register
            </Button>
            {/* <Button onClick={logout}>Logout</Button> */}
        </Stack>
    );
};

export default Nav;