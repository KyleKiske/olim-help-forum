import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import { Card, CardMedia, CardContent} from "@mui/material";
import { styled } from '@mui/material/styles';

import Thread from "./Thread";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const Forum = () => {
    const { userInfo } = useContext(AppContext);
    const [categoryList, setCategoryList] = useState([]);
    const [threadList, setThreadList] = useState([]);

    const getAllCategories = async () => {
        try {
            const res = await axios.get("/categories");
            const data = res.data;
            console.log("res2");
            setCategoryList(data);
            console.log(categoryList);
            console.log("catList");
        } catch (e) {
            console.log(e);
        }
    }

    const getAllThreads = async () => {
        try {
            const res = await axios.get('/threads');
            const data = res.data;
            setThreadList(data);
            console.log("threadlist");
            console.log(threadList);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        Promise.all([
            axios.get("/categories"),
            axios.get('/threads'),
        ])
            .then(([resCategories, resThreads]) =>
                Promise.all([resCategories.data, resThreads.data])
        )
        .then(([dataCats, dataThreads]) => {
            setCategoryList(dataCats);
            setThreadList(dataThreads);
        });
    }, []);

    return (
        <>
            <Typography>dsadasdsad</Typography>
            {categoryList && categoryList.map((category) => { 
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {threadList.map((thread) => (
                                thread.category_id == category.id && (
                                    <Typography key={thread.id}>{thread.title}</Typography>
                                )
                            ))}
                            <Typography>AMOGUS</Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.

                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </>
    )
}

export default Forum;