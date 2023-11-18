import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { AppContext } from "../App";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Box } from '@mui/material';
import Popup from 'reactjs-popup';
import axios from "axios";
import { width } from '@mui/system';

const save = (data) => {
    console.log(data)
}   

export const ArticleEditor = () => {
    const { userInfo } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [articleList, setArticleList] = useState([]);

    const getAllInvisArticles = async () => {
        try {
            const res = await axios.get(`/api/articles/invis`);
            const data = res.data;
            setArticleList(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllInvisArticles();
    }, []);

    const createArticle = async () => {
        if (mainImage === null) {
            setMainImage("https://res.cloudinary.com/dundmkgym/image/upload/v1699100199/Flag_of_Israel.svg_qbwtbd.webp");
        }
        console.log("attempting it");
        try {
            console.log("title", title);
            console.log("body", value);
            console.log("author", userInfo.user_id);
            console.log("main image", mainImage);
            const res = await axios.post("/api/articles/create", { title: title, body: value, author_id: userInfo.user_id, main_image: mainImage });
            if (res.status === 201) {
                console.log("New article created");
            }
        } catch (err) {
            console.error("Creation of article failed: ", err);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h2">Unpublished Articles</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {articleList && articleList.map((article) => { 
                    return (
                        <Grid md={6}>
                            <Card>
                                {article.main_image ? (
                                    <CardMedia 
                                    component="img"
                                    image={article.main_image} 
                                    height="200"/>
                                ) : (
                                    <CardMedia 
                                    component="img"
                                    image="https://res.cloudinary.com/dundmkgym/image/upload/v1699100199/Flag_of_Israel.svg_qbwtbd.webp" 
                                    height="200"/>    
                                )}
                                <CardContent>
                                    <Typography variant="h4" align="center">{article.title}</Typography>
                                    <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{article.body}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size='small' href={`/article/${article.id}`}>Learn more</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )   
};
