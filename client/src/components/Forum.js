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
    const [categoryList, setCategoryList] = useState();

    const getAllCategories = async () => {
        try {
            // const res = [ {name: "222"}]
            const res = await axios.get("/categories");
            const data = res.data;
            console.log("res");
            console.log(data);
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
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllCategories();
        getAllThreads();
    }, [])

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