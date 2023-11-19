import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css'
import { AppContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import axios from "axios";


export const ArticleWriter = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [mainImage, setMainImage] = useState(null);

    const createArticle = async () => {
        if (mainImage === null) {
            setMainImage("https://res.cloudinary.com/dundmkgym/image/upload/v1699100199/Flag_of_Israel.svg_qbwtbd.webp");
        }
        try {
            const res = await axios.post("/api/articles/create", { title: title, body: value, author_id: userInfo.user_id, main_image: mainImage });
            if (res.status === 201) {
                alert("New Article created for further editing.")
                navigate("/editor")
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
            ['break'],
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
            <Button variant='contained' onClick={createArticle}>Submit</Button>
        </Container>
    )   
};

export const ReplyWriter = () => {   
    const navigate = useNavigate();
    const { userInfo } = useContext(AppContext);
    const [value, setValue] = useState("");
    const { id } = useParams();

    const createReply = async () => {
        try {
            const res = await axios.post("/api/replies/create", {  thread_id: id, author_id: userInfo.user_id, body: value });
            if (res.status === 201) {
                alert("New reply added.")
                navigate(`/threads/${id}`);
            }
        } catch (err) {
            console.error("Creation of article failed: ", err);
        }
    };

    const writerStyle = {
        width : "70%",
        margin : "auto"
    };

    let modulesReply = {
        toolbar: [
            [{"header": [1,2,3,4,false]}],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean'],
            ['break'],
        ],
    };

    return (
        <Container maxWidth="md">
            <Typography variant='h2' textAlign="center">Write a new reply</Typography>
            <ReactQuill 
                theme='snow'
                modules={modulesReply}
                value={value}
                onChange={setValue}
                style={writerStyle} />
            <Button variant='contained' onClick={createReply}>Submit</Button>
        </Container>
    )     
};
            