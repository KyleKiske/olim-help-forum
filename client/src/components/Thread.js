import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import { Card, CardMedia, CardContent, List} from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import { ReplyWriter } from "./ArticleWriter";
import DOMPurify from 'dompurify';

const Thread = () => {
    const { userInfo } = useContext(AppContext);
    const [replyList, setReplyList] = useState([]);
    const [author, setAuthor] = useState("");
    const [replyAuthorList, setReplyAuthorList] = useState([]);
    const [thread, setThread] = useState("");
    const { id } = useParams();


    //Fetch data for forum thread

    const getThread = async() => {
        try {
            const res = await axios.get(`/api/threads/${id}`);
            const data =  res.data;
            setThread(data);
            const authorRes = await axios.get(`/api/users/user/${data.author_id}`);
            const authorData = authorRes.data;            
            setAuthor(authorData);
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

    const getAuthors = async() => {
        try {
            const res = await axios.get(`/api/users/threadreps/${id}`)
            const data = res.data;
            setReplyAuthorList(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getThread();
        getReplies();
        getAuthors();
    }, []);


    return ( 
        <Container maxWidth="lg">
            <Typography component="div" variant="h2">
                {thread.title}
            </Typography>
            <Card sx={{display: "flex", marginBottom: "1rem", minHeight: "250px"}} >
                <CardContent sx={{paddingTop: 0, paddingBottom: "5px", display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <CardMedia
                        component="img"
                        height="100px"
                        image={author?.avatar || "https://res.cloudinary.com/dundmkgym/image/upload/v1700064196/vuferzkjl8zourz8bjk9.png"}
                        sx={{ borderRadius: '50%', width: "100px" }}
                    />
                    <CardContent sx={{paddingTop: "5px"}}>
                        <Typography variant="subtitle1" sx={{margin: "auto", width: "50%"}}>{author.username}</Typography>
                        <Typography variant="body2" color="textSecondary">
                                {new Date(thread.created_at).toLocaleString('en-GB', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}  
                        </Typography>
                    </CardContent>
                </CardContent>
                <Divider orientation="vertical" flexItem>
                </Divider>
                <Box sx={{display: "flex", flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.body)}}></div>
                </CardContent>
                </Box>
            </Card>
            <br></br>
            <Typography variant="h4">Replies</Typography>
            <Grid container flexDirection={"column"}>
                {replyList.map((reply) => (
                    <Card sx={{display: "flex", marginBottom: "1rem", minHeight: "170px"}} >
                        <CardContent sx={{paddingTop: 0, paddingBottom: "5px", display: "flex", alignItems: "center", flexDirection: "column"}}>
                            <CardMedia
                                component="img"
                                height="100px"
                                image={replyAuthorList[reply.author_id - 1]?.avatar || "https://res.cloudinary.com/dundmkgym/image/upload/v1700064196/vuferzkjl8zourz8bjk9.pnghttps://i.redd.it/m8rc2evxc0l21.jpg"}
                                sx={{ borderRadius: '50%', width: "100px" }}
                            />
                            <CardContent sx={{paddingTop: "5px"}}>
                                <Typography variant="subtitle1" sx={{margin: "auto", width: "50%"}}>{replyAuthorList[reply.author_id - 1]?.username || "Deleted user"}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                        {new Date(reply.created_at).toLocaleString('en-GB', {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}  
                                </Typography>
                            </CardContent>
                        </CardContent>
                        <Divider orientation="vertical" flexItem>
                        </Divider>
                        <CardContent item xs>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reply.body)}}></div>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
            <ReplyWriter/>
        </Container>
    )
}

export default Thread;