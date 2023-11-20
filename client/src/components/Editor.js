import React, { useState, useContext, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'
import { AppContext } from "../App";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from "@mui/system/Unstable_Grid/Grid";
import axios from "axios";


export const ArticleEditor = () => {
    const { userInfo } = useContext(AppContext);
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

    return (
        <Container maxWidth="md">
            <Typography variant="h2" sx={{textAlign: "center"}}>Unpublished Articles</Typography>
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
