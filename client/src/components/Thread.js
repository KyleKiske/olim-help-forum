import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import { Card, CardMedia, CardContent} from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";


function UserInfo(props) {
    return(
        <Avatar src="">
            
        </Avatar>
    )
}


const Thread = () => {
    const { userInfo } = useContext(AppContext);
    const [replyList, setReplyList] = useState([]);
    // const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const param = useParams();

    //Fetch data for forum thread

    const getReplies = async() => {
        try {
            const res = await axios.get(`/thread/${param.id}`);
            const data = await res.json();
            setReplyList(data);
        } catch (e) {
            console.log(e);
        }
    }

    return ( 
        <>
            <Card sx={{display: "flex"}}>
                <CardMedia>
                    <Avatar alt="Jemy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Charles-Leclerc_%28cropped%29.jpg/640px-Charles-Leclerc_%28cropped%29.jpg"/>
                </CardMedia>
                <Box sx={{display: "flex", flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                </CardContent>
                </Box>
            </Card>
            {/* <List> */}
            <Grid></Grid>
                {replyList.map((reply) => (
                    <Grid Container>
                        <Grid item xs={3}>
                            <Avatar src={reply.user.avatar} />  
                            <Typography>{reply.user.username}</Typography>
                            <Typography>{reply.date}</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{reply.contents}</Typography>
                        </Grid>
                    </Grid>
                ))}
            {/* </List> */}
        </>

    )
}

export default Thread;





            // <Box>  
        //     <Grid Container>
        //         <Grid xs={3}>
                    
        //         </Grid>
        //         <Grid xs={9}>

        //         </Grid>
        //     </Grid>
        // </Box>