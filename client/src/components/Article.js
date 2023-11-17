import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

const Article = () => {
    const { userInfo } = useContext(AppContext);
    const [article, setArticle] = useState("");
    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("");
    const { id } = useParams();

    const getArticle = async() => {
        try {
            const res = await axios.get(`/api/articles/${id}`);
            const data = res.data;
            setArticle(data);
            const authorRes = await axios.get(`/api/users/user/${data.author_id}`);
            const authorData = authorRes.data;            
            setAuthor(authorData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getArticle();
    }, []);


    return (
        <Container maxWidth="md">
            {article.main_image ? (
                <Box 
                component="img"
                sx={{height: 300, display: "block", margin: "auto"}}
                src={article.main_image}/>
            ) : (
                <Box 
                component="img"
                sx={{height: 300, display: "block", margin: "auto"}}
                src='https://res.cloudinary.com/dundmkgym/image/upload/v1699100199/Flag_of_Israel.svg_qbwtbd.webp'/>    
            )}
            <Typography>{article.body}</Typography>
            <Typography variant="caption">Written by <strong>{author.username}</strong></Typography>
            <Button variant='contained' onClick={() => {
                    console.log(userInfo);

            }}>Submit</Button>
        </Container>
    )
}

export default Article;