import React, { useEffect, useState, useContext } from "react";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import axios from "axios";

const Home = () => {
    const [thread, setThread] = useState("");
    const [threadList, setThreadList] = useState([]);

    const navigate = useNavigate();

    //👇🏻 The useEffect Hook
    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                fetch("http://localhost:4000/threads")
                    .then((res) => res.json())
                    .then((data) => setThreadList(data.threads))
                    .catch((err) => console.error(err));
            }
        };
        checkUser();
    }, [navigate]);

    const createThread = () => {
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        axios.post("http://localhost:4000/api/create/thread", {
                thread,
                userId: localStorage.getItem("_id")
            }, config)
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setThreadList(data.threads);
            })
            .catch((err) => console.error(err));
    };
    
    //👇🏻 Triggered when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        //👇🏻 Calls the function
        createThread();
        setThread("");
    };

    return (
        <>
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    {/*--form UI elements--*/}
                </form>
    
                <div className='thread__container'>
                    {threadList.map((thread) => (
                        <div className='thread__item' key={thread.id}>
                            <p>{thread.title}</p>
                            <div className='react__container'>
                                <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                                <Comments
                                    numberOfComments={thread.replies.length}
                                    threadId={thread.id}
                                    title={thread.title}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Home;