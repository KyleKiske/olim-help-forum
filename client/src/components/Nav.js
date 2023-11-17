import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Stack } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';
import FeedIcon from '@mui/icons-material/Feed';
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
                <FeedIcon/> <span style={{ marginLeft: "20px" }}>Home</span>
            </Button>
            <Button component={Link} to="/forum">
                <ForumIcon/> <span style={{ marginLeft: "20px" }}>Forum</span> 
            </Button>
            <Button component={Link} to="/profile">
                <AccountBoxIcon/> <span style={{ marginLeft: "20px" }}>Profile</span>
            </Button>
            {/* <Button onClick={logout}>Logout</Button> */}
        </Stack>
    );
};

export default Nav;