import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css'

const save = (data) => {
    console.log(data)
}   

const ArticleAndThreadWriter = () => {   
    const [value, setValue] = useState('');
    
    const writerStyle = {
        width : "70%",
        margin : "auto"
    };
    
    let modul= {
        toolbar: [
            [{"header": [1,2,3,4,false]}],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };


    return (
        <>
            <ReactQuill 
                theme='snow'
                modules={modul}
                value={value}
                onChange={setValue}
                style={writerStyle} />
            <Button variant='contained' onClick={() => {
                    alert('clicked');
                    save(value);
            }}>Submit article</Button>
        </>
    )   
}

export default ArticleAndThreadWriter;