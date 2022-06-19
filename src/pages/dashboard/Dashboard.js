import React, { useState, useEffect } from "react";
import { 
    Card,
    Form,
    Button, 
    Alert,
    Container
} from 'react-bootstrap'
import { Link, useNavigate as useHistory} from 'react-router-dom';
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useUserData } from "../../contexts/UserDataContext";
import User from './User';
import Projects from './Projects2';
import Tickets from './Tickets2';
import './Dashboard.css'

export default function Dashboard(){
    const { currentUser } = useAuth();
    const { userData } = useUserData();
    console.log("User Data: ", userData);
    const [imgURL, setImgURL] = useState("")
    const history = useHistory();
    useEffect(()=>{
        if(currentUser){
            try{
                if(currentUser.providerData[0].providerId === "facebook.com"){
                    const cred = JSON.parse(window.localStorage.getItem("fbAccessToken"));
                    if(cred){
                        setImgURL(`${currentUser._delegate.photoURL}?access_token=${cred.token}`)
                    }
                }else{
                    if(currentUser.photoURL){
                        setImgURL(currentUser.photoURL)
                    }else{
                    }
                }
            }catch(err){
                console.log("Dashboard.js> Useeffect: ", err)
            }
            console.log("Curr User: ", currentUser)
        }
    },[])

    const contentStyles ={
        display: "flex",
        flexDirection: "column",
        width: "100%",
    }

    return(
        < >
            <Container className="dash-body">
                <div
                    className="d-flex justify-content-center"
                    style={{ minHeight: "75vh" }}
                >
                    {/* <div className="w-100" style={{ maxWidth: "600px" }}> */}
                    <div className="w-100" style={contentStyles}>
                        {/* <User imgURL={imgURL} /> */}
                        <Projects />
                        <Tickets />
                        {/* <div className="w-100 text-center mt-2">
                            <Link to="">Place Holder 3</Link>
                        </div> */}
                    </div>
                </div>
            </Container>
        </>
    )
}