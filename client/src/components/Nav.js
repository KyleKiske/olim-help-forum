import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Stack } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';
import FeedIcon from '@mui/icons-material/Feed';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateIcon from '@mui/icons-material/Create';
import "./Nav.css";

import { AppContext } from "../App";

const Nav = (props) => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <Stack spacing={2} direction={"row"} sx={{}}>
            <Button component={Link} to="/dashboard">
                <FeedIcon/> <span style={{ marginLeft: "10px" }}>Home</span>
            </Button>
            <Button component={Link} to="/forum">
                <ForumIcon/> <span style={{ marginLeft: "10px" }}>Forum</span> 
            </Button>
            <Button component={Link} to="/profile">
                <AccountBoxIcon/> <span style={{ marginLeft: "10px" }}>Profile</span>
            </Button>
            <Button component={Link} to="/editor">
                <EditNoteIcon/> <span style={{marginLeft: "10px"}}>Editor</span>
            </Button>
            <Button component={Link} to="/articleWriter" sx={{color: "#FF1744"}}>
                <CreateIcon/> <span style={{marginLeft: "10px"}}>New Article</span>
            </Button>
            {/* <Button onClick={logout}>Logout</Button> */}
        </Stack>
    );
};

export default Nav;