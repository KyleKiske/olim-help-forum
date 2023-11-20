import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Category = () => {
    const [title, setTitle] = useState("");
    const { userInfo } = useContext(AppContext);
    const navigate = useNavigate();

    const createCategory = async () => {
        try {
            const res = await axios.post(`/api/categories/create`, {name: title});
            if (res.status === 201) {
                alert("New Category created.")
                navigate("/dashboard")
            }
        } catch (e) {
            console.log(e);
        }
    }

    function handleChange(e) {
        setTitle(e.target.value);
    }

    return (
        <Box
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          {userInfo.superuser? (
            <>
                <TextField id="filled-basic" label="Category name" variant="filled" value={title} onChange={handleChange}/>
                <Button variant='contained' onClick={createCategory}>Create</Button>
            </>
          ) : <></>}
        </Box>
    );
}