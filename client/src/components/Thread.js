import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import { Card, CardMedia, CardContent} from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Thread = () => {
    const { userInfo } = useContext(AppContext);
    const [replyList, setReplyList] = useState([]);
    // const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const [thread, setThread] = useState("");
    const { id } = useParams();


    //Fetch data for forum thread

    const getThread = async() => {
        try {
            const res = await axios.get(`/api/threads/${id}`);
            const data =  res.data;
            setThread(data);
        } catch (e) {
            console.log(e);
        }
    }

    const getReplies = async() => {
        try {
            const res = await axios.get(`/api/replies/thread/${id}`);
            const data = res.data;
            setReplyList(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getThread();
        getReplies();
    }, []);


    return ( 
        <>
        {console.log(replyList)}
            <Typography component="div" variant="h2">
                {thread.title}
            </Typography>
            <Card sx={{display: "flex"}}>
                <CardMedia>
                    <Avatar alt="Jemy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Charles-Leclerc_%28cropped%29.jpg/640px-Charles-Leclerc_%28cropped%29.jpg"/>
                </CardMedia>
                <Box sx={{display: "flex", flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {thread.body}
                    </Typography>
                </CardContent>
                </Box>
            </Card>
            {/* <List> */}
            <Grid container rowSpacing={1} flexDirection={"column"}>
                {replyList.map((reply) => (
                    <Grid container>
                        <Grid item>
                            <Avatar src="https://ssl.gstatic.com/onebox/media/sports/logos/CpHtpHDYt6p7c2iQiM324g_64x64.png" />
                            <Typography variant="subtitle1">{reply.author_id}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {reply.created_at}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1">{reply.body}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            {/* <ArticleAndThreadWriter moduleChoice="modulesReply" /> */}
            {/* </List> */}
        </>

    )
}

export default Thread;



                    // <Grid Container>
                    //     <Grid xs={2}>
                    //         {/* <Avatar src={reply.user.avatar} />   */}
                    //         <Item>
                    //             <Typography>{reply.author_id}</Typography>
                    //             <Typography>{reply.created_at}</Typography>
                    //         </Item>
                    //     </Grid>
                    //     <Grid xs={9}>
                    //         <Item><Typography>{reply.body}</Typography></Item>
                    //     </Grid>
                    // </Grid>