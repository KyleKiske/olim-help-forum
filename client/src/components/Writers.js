import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css'
import { AppContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
            console.error("Creation of replt failed: ", err);
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
            
export const ThreadWriter = () => {   
    const { userInfo } = useContext(AppContext);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        try {
            const res = await axios.get(`/api/categories/`);
            const data = res.data;
            console.log(data);
            setCategoryList(data);
        } catch (error) {
            console.log(error);
        }
    }

    const createThread = async () => {
        try {
            const res = await axios.post("/api/threads/create", {  category_id: category, author_id: userInfo.user_id, body: value, title: title });
            if (res.status === 201) {
                alert("New thread created!");
            }
        } catch (err) {
            console.error("Creation of thread failed: ", err);
        }
    };

    function handleChange(e) {
        setTitle(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
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
            <Typography variant='h2' textAlign="center">Create a new thread</Typography>
            <TextField label="Write a thread Title" id="titleField" value={title} onChange={handleChange} sx={{m: 2, width: '100ch'}}/>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Select-category">Category</InputLabel>
                <Select
                    labelId="Select-category"
                    id="select-thread-category"
                    value={category}
                    label="Category"
                    onChange={handleCategory}
                >
                    {categoryList.map((category) => (
                        <MenuItem
                            value={category.id}
                        >
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ReactQuill 
                theme='snow'
                modules={modulesReply}
                value={value}
                onChange={setValue}
                style={writerStyle} />
            <Button variant='contained' onClick={createThread}>Submit</Button>
        </Container>
    )     
};
     