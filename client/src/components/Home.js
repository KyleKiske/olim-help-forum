import React, { useEffect, useState, useContext } from "react";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import axios from "axios";
import { AppContext } from "../App";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import DOMPurify from 'dompurify';

const Home = () => {
    const { userInfo } = useContext(AppContext)
    const [thread, setThread] = useState("");
    const [articleList, setArticleList] = useState([]);

    const navigate = useNavigate();

    //👇🏻 The useEffect Hook
    useEffect(() => {
        getAllArticles();
    }, []);
    
    const getAllArticles = async () => {
        try {
            const res = await axios.get(`/api/articles`);
            const data = res.data;
            setArticleList(data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h2">Articles</Typography>
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
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body)}} style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxHeight: "50px" }}></div>
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
    );
};

export default Home;