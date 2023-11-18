import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../App";
import Popup from 'reactjs-popup';
import axios from "axios";
import DOMPurify from 'dompurify';

const Article = () => {
    const [previewSource, setPreviewSource] = useState('')
    const navigate = useNavigate();
    const { uploaded, setUploaded } = useContext(AppContext);
    const [article, setArticle] = useState("");
    const [author, setAuthor] = useState("")
    // const [title, setTitle] = useState("");
    const [sanitizedBody, setSanitizedBody] = useState("");
    const { id } = useParams();

    const getArticle = async() => {
        try {
            const res = await axios.get(`/api/articles/${id}`);
            const data = res.data;
            setArticle(data);
            setSanitizedBody(DOMPurify.sanitize(data.body));
            const authorRes = await axios.get(`/api/users/user/${data.author_id}`);
            const authorData = authorRes.data;            
            setAuthor(authorData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!previewSource) return
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await fetch(`/api/uploadThumbnail/${id}`, {
                method: "POST",
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { "Content-type": "application/json" }
            });            
            setUploaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        getArticle();
        setPreviewSource(null);
    }, [uploaded]);

    const makeArticleVisible = async () => {
        try {
            const res = await axios.patch(`/api/articles/visible/${id}`);
            if (res.status === 200) {
                alert(`Article ${id} made visible`);
                navigate('/dashboard');
            }
        } catch (err) {
            // console.log(res.status);
            console.error("Creation of article failed: ", err);
        }
    }


    return (
        <Container maxWidth="md">
            {!article.visible ? ( 
                <Popup
                    trigger={<Button className="button" style={{ color: '#004F6C', fontSize: '13px' }}> Change Thumbnail </Button>}
                    modal
                    nested
                >
                    {close => (
                        <div className="modal" style={{ backgroundColor: '#FFF' }}>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header"> Change Article Image </div>
                            <div className="content" style={{ width: '100%', margin: 'auto', padding: '16px', borderRadius: '20px', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                {' '}
                                <form onSubmit={(e) => { handleSubmitFile(e); close() }} style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
                                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleFileInputChange} style={{ border: '1px white solid' }} />
                                    <Button style={{ color: '#004F6C', backgroundColor: "bisque" }} type="submit">Submit</Button>
                                </form>
                                {previewSource && (<Box component="img" alt="chosen" sx={{ height: 300, display: 'block' }} src={previewSource} className="chosen-image" />)}
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
                </Popup> 
            ) : (<></>)}
            <Typography variant="h2">{article.title}</Typography>
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
            <div dangerouslySetInnerHTML={{ __html: sanitizedBody}}></div>
            {/* <Typography>{sanitizedBody}</Typography> */}
            <Typography variant="caption">Written by <strong>{author.username}</strong></Typography>
            <br />
            {!article.visible ? (
                <Button variant='contained' onClick={makeArticleVisible} >
                    Publish Article to make it visible
                </Button>
            ) : (<></>)}
            
        </Container>
    )
}

export default Article;