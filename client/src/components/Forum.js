import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Container from '@mui/material/Container';

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

    useEffect(() => {
        Promise.all([
            axios.get("api/categories"),
            axios.get('api/threads'),
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
        <Container maxWidth="md">
            <Typography variant="h2" sx={{textAlign: "center"}}>Categories</Typography>
            {categoryList && categoryList.map((category) => { 
                return (
                    <Accordion sx={{backgroundColor: "gainsboro"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h4">{category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {threadList.map((thread) => (
                                thread.category_id == category.id && (
                                    <>
                                        <Divider sx={{ borderBottomWidth: 2, bgcolor: "crimson"}}></Divider>
                                        <Link href={`/threads/${thread.id}`} underline="hover">{thread.title}</Link>
                                    </>                                     
                                )
                            ))}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Container>
    )
}

export default Forum;