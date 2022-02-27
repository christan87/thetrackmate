import React, { useState } from "react";
import { 
    Card,
    Form,
    Button, 
    Alert,
    Container
} from 'react-bootstrap'
import { Link, useNavigate as useHistory} from 'react-router-dom';
import useLocalStorageState from "../../hooks/useLocalStorageState";
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import IconButton from '@material-ui/core/IconButton';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'; //admin
import PeopleIcon from '@material-ui/icons/People'; //collab
import PersonIcon from '@material-ui/icons/Person'; //user
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'; //guest

export default function DemoLogin(){
    const { currentUser, logout } = useAuth();
    const { 
        adminDemoLogin,
        collabDemoLogin,
        userDemoLogin,
        guestDemoLogin 
     } = useDemoAuth();

    const history = useHistory();

    async function handleAdminDemoLogin(){
        try{
            if(currentUser){
                await logout();
            }
            adminDemoLogin()
        }catch(e){
            console.log("DemoLogin.jd>handleAdminDemoLogin ", e)
        }
        history("/")
    }
    async function handleCollabDemoLogin(){
        try{
            if(currentUser){
                await logout();
            }
            collabDemoLogin()
        }catch(e){
            console.log("DemoLogin.jd>handleCollabDemoLogin ", e)
        }
        history("/")
    }
    async function handleUserDemoLogin(){
        try{
            if(currentUser){
                await logout();
            }
            userDemoLogin()
        }catch(e){
            console.log("DemoLogin.jd>handleUserDemoLogin ", e)
        }
        history("/")
    }
    async function handleGuestDemoLogin(){
        try{
            if(currentUser){
                await logout();
            }
            guestDemoLogin()
        }catch(e){
            console.log("DemoLogin.jd>handleGuestDemoLogin ", e)
        }
        history("/")
    }
    return(
        <>
            <Container>
                {/* <Navbar /> */}
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Demo Roles</h2>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <h5 class="card-title">Admin Role</h5>
                                                <IconButton onClick={handleAdminDemoLogin}>
                                                    <SupervisorAccountIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <h5 class="card-title">Collab Role</h5>
                                                <IconButton onClick={handleCollabDemoLogin}>
                                                    <PeopleIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <h5 class="card-title">User Role</h5>
                                                <IconButton onClick={handleUserDemoLogin}>
                                                    <PersonIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <h5 class="card-title">Guest Role</h5>
                                                <IconButton onClick={handleGuestDemoLogin}>
                                                    <PersonOutlineIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 text-center mt-3">
                                    <Link to="">Place Holder 1</Link>
                                    <Link className="ms-1" to="">Place Holder 2</Link>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <Link to="">Place Holder 3</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}