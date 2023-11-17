import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css'

import { useContext } from "react";
import { AppContext } from "../App";


const save = (data) => {
    console.log(data)
}   

const saveArticle = (data) => {

}

export const ArticleAndThreadWriter = () => {   
    const { userInfo } = useContext(AppContext);
    const [value, setValue] = useState('');

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
        <>
            <ReactQuill 
                theme='snow'
                modules={modulesArticle}
                value={value}
                onChange={setValue}
                style={writerStyle} />
            <Button variant='contained' onClick={() => {
                    alert('clicked');
                    save(value);
                    console.log(userInfo);
            }}>Submit</Button>
        </>
    )   
};

export const ReplyWriter = () => {   
    const [value, setValue] = useState('');

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
            ['clean']
        ],
    };

    return (
        <>
            <ReactQuill 
                theme='snow'
                modules={modulesReply}
                value={value}
                onChange={setValue}
                style={writerStyle} />
            <Button variant='contained' onClick={() => {
                    alert('clicked');
                    save(value);
            }}>Submit</Button>
        </>
    )   
};

// export { ArticleAndThreadWriter, ReplyWriter };