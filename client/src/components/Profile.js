import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Avatar from '@mui/material/Avatar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

const Profile = ({ children }) => {
    const [previewSource, setPreviewSource] = useState('')
    const navigate = useNavigate();
    const { token, setToken, userInfo, setUserInfo, uploaded, setUploaded } = useContext(AppContext);


    const logout = async () => {
        try {
            const res = await axios.get("api/users/logout", {
                headers: {
                    "x-access-token": null,
                },
            });
            if (res.status === 200) {
                localStorage.removeItem("token");
                setToken(null);
                navigate("/login");
            }
        } catch (err) {
            setToken(null);
            navigate("/login");
        }
    };

    useEffect(() => {
        setPreviewSource(null)
    }, [token, uploaded])

    // show preview of avatar to submit

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!previewSource) return
        uploadImage(previewSource);
    }

    // Send avatar to Cloudinary

    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await fetch("/api/upload", {
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

    return (
        <div style={{ padding: '105px 200px', display: "flex", flexDirection: "column", backgroundColor: '#AFAFF2', backgroundImage: 'inherit', backgroundRepeat: 'repeat' }}>
            <h1 style={{margin: 'auto', borderBottom: '5px solid #F8D57E', color: 'rgba(255, 255, 255, 1)', marginBottom: '30px' }}>PROFILE</h1>
            <div className="card-container">
                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src={userInfo.avatar} sx={{ width: 100, height: 100 }} style={{ marginBottom: '8px', border: '2px solid #111111' }} />
                </Stack>
                <Popup
                    trigger={<Button className="button" style={{ color: '#004F6C', fontSize: '13px' }}> Change avatar </Button>}
                    modal
                    nested
                >
                    {close => (
                        <div className="modal" style={{ backgroundColor: '#FFF' }}>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header"> Change Avatar </div>
                            <div className="content" style={{ width: '100%', margin: 'auto', padding: '16px', borderRadius: '20px', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                {' '}
                                <form onSubmit={(e) => { handleSubmitFile(e); close() }} style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
                                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleFileInputChange} style={{ border: '1px white solid' }} />
                                    <Button style={{ color: '#004F6C', backgroundColor: "bisque" }} type="submit">Submit</Button>
                                </form>
                                {previewSource && (<Avatar alt="chosen" sx={{ width: 250, height: 250 }} src={previewSource} className="chosen-image" />)}
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h1>Welcome Back!</h1>
                    <p>Username: {userInfo ? userInfo.username : "Guest"}</p>
                    <p>Email: {userInfo ? userInfo.email : "N/A"}</p>
                    <Button style={{ marginTop: '20px', color: '#FF0004' }} onClick={logout}>Logout</Button>
                    <UserContext.Provider value={{ userInfo, setUserInfo }}>
                        {children}
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default Profile;