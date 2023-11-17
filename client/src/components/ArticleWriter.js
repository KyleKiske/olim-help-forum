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


export const ArticleWriter = () => {
    const { userInfo } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [mainImage, setMainImage] = useState(null);

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



{/* <Popup
                trigger={<Button className="button" style={{ color: '#004F6C', fontSize: '13px' }}> Upload an image to the cloud</Button>}
                modal
                nested
            >
                {close => (
                    <div className="modal" style={{ backgroundColor: '#FFF' }}>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Upload an image to Cloudinary for later use </div>
                        <div className="content" style={{ width: '100%', margin: 'auto', padding: '16px', borderRadius: '20px', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                            {' '}
                            <form onSubmit={(e) => { handleSubmitFile(e);  close() }} style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
                                <input type="file" id="main_img" name="main_img" accept="image/png, image/jpeg" onChange={handleFileInputChange} style={{ border: '1px white solid' }} />
                                <Button style={{ color: '#004F6C', backgroundColor: "bisque" }} type="submit">Submit</Button>
                            </form>
                            {previewSource && (<Box 
                                                component='img'
                                                sx={{ width: 250, height: 250 }} 
                                                src={previewSource} 
                                                className="chosen-image" />)}
                        </div>
                        <div className="actions">
                            <Button
                                style={{ color: '#004F6C' }}
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Popup> */}





            // useEffect(() => {
            //     setPreviewSource(null)
            // }, [uploaded])
        
            // const handleSubmitFile = async (e) => {
            //     e.preventDefault();
            //     if (!previewSource) return
            //     uploadImage(previewSource);
            // }
        
            // const uploadImage = async (base64EncodedImage) => {
            //     try {
            //         const res = await fetch("/api/upload/article", {
            //             method: "POST",
            //             body: JSON.stringify({ data: base64EncodedImage }),
            //             headers: { "Content-type": "application/json" }
            //             });
            //         console.log(res);   
            //         // let result = res.get("image-link");
            //         // console.log("result");
            //         // console.log(result);    
            //         setUploaded(true);
            //     } catch (err) {
            //         console.log(err)
            //     }
            // }
        
            // const handleFileInputChange = (e) => {
            //     const file = e.target.files[0]
            //     previewFile(file)
            // }
        
            // const previewFile = (file) => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onloadend = () => {
            //         setPreviewSource(reader.result)
            //     }
            // }
            