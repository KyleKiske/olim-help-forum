import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import { Card, CardMedia, CardContent } from "@mui/material";


const Thread = () => {
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");

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
            <Typography></Typography>
        </>
    )
}

export default Thread;