import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from "@mui/system/Unstable_Grid/Grid";

import Avatar from "@mui/material/Avatar";
import { Card, CardMedia, CardContent} from "@mui/material";
import { styled } from '@mui/material/styles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import axios from "axios";
import { AppContext } from "../App";

const Category = () => {
    const { userInfo } = useContext(AppContext);
    const [threadList, setThreadList] = useState([]);

    const getAllThreads = async (id) => {
        try {
            const res = await axios.get(`categories/${id}/threads`);
            const data = res.data;
            setThreadList(data);
            console.log("threadlist");
            console.log(threadList);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllThreads();
    }, [])

    return (
        <Container maxWidth="md">
            <Grid container spacing={0}>
                <Grid xs={3}>
                    <Avatar></Avatar>
                    <Typography>Posted on date!!!!!!!</Typography>
                    <Typography>NickName</Typography>
                </Grid>
                <Grid xs={9}>
                    <Typography>Contents of reply</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}