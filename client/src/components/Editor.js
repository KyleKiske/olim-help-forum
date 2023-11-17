import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css'
import { AppContext } from "../App";
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
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
    const { id } = useParams();

    const getAllInvisArticles = async () => {
        try {
            const res = await axios.get(`/api/articles/invis`);
            const data = res.data;
            setArticleList(data);
        } catch (e) {
            console.log(e);
        }
    }


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

    function handleChange(e) {
        setTitle(e.target.value);
    }

    const writerStyle = {
        width : "70%",
        margin : "auto"
    };
    
    let modulesArticle = {
        toolbar: [
            [{"header": [1,2,3,4,false]}],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <Container maxWidth="md">
            <Typography variant='h2' textAlign="center">Write a new article</Typography>
            <TextField label="Write an article Title" id="titleField" value={title} onChange={handleChange} sx={{m: 2, width: '100ch'}}/>
            <ReactQuill 
                theme='snow'
                modules={modulesArticle}
                value={value}
                onChange={setValue}
                style={writerStyle} />
            <Button variant='contained' onClick={() => {
                    alert('clicked');
                    createArticle();
                    console.log(userInfo);

            }}>Submit</Button>
        </Container>
    )   
};
