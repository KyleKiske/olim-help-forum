import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export const Auth = (props) => {
    const { token, setToken } = useContext(AppContext);
    const [redirect, setRedirect] = useState(null);
    const navigate = useNavigate();


    useEffect(() => { 
        const verify = async () => {
            try {
                const res = await axios.get("/api/users/verify", {
                    headers: {
                        "x-access-token": token?.token,
                    },
                });
                if (res.status === 200) {
                    setRedirect(true);
                }
            } catch (err) {
                setToken(null);
                navigate("/login");
            }
        };
        if (!localStorage.getItem('token')){
            localStorage.setItem('token', token.token)    
        }
        verify();
    }, []);

    return redirect ? props.children : null;
};
