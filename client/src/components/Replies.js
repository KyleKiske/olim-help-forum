import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Replies = () => {
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchReplies = () => {
            fetch("http://localhost:4000/thread/comment", {
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setReplyList(data.replies);
                    setTitle(data.title);
                })
                .catch((err) => console.error(err));
        };
        fetchReplies();
    }, [id]);

    const addReply = () => {
        fetch("http://localhost:4000/api/create/reply", {
            method: "POST",
            body: JSON.stringify({
                id,
                user_Id: localStorage.getItem("_id"),
                reply,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                navigate("/dashboard");
            })
            .catch((err) => console.error(err));
    };
    
    const handleSubmitReply = (e) => {
        e.preventDefault();
        //👇🏻 calls the function
        addReply();
        setReply("");
    };

    return (
        <Container></Container>
    )
};

export default Replies;