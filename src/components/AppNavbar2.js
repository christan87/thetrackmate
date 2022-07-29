import React from 'react'
import { Link, useNavigate as useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../contexts/AuthDemoContext";
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person'; //user
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useUserData } from '../contexts/UserDataContext';
import Avatar from '@material-ui/core/Avatar';
import Messages from './Messages';

import { 
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

import './AppNavbar2.css'

function AppNavbar(props){
    const { currentUser, logout, setCurrentUser, setAuthUser } = useAuth();
    const { demoMode, demoLogout, demoUser } = useDemoAuth();
    const { classes, open, handleDrawerOpen, count } = props;
    const { userData } = useUserData();
    const history = useHistory();

    let useId = "";
    if(currentUser){
        useId = currentUser._id
    }else{
        useId = demoUser._id
    }
    async function handleLogout() {
        try{
            if(currentUser){
                await logout();
                setCurrentUser(null)
                setAuthUser(null)
            }
            if(demoMode){
                demoLogout();
            }
            history("/login");
        }catch(err){
            console.log("Failed to log out: ", err);
        }
        
    }

    function handleUserAccount(){
        console.log(`/user/${useId}`)
        history("/user")
    }

    return(
        //minHeight stops the height change when the drawer opens
        <Navbar className="appNavbar" expand="lg" style={{minHeight: "64px", padding: 0}} > 
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="appNavbar-nav me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    {/* <Link to="/" className="nav-link">Home</Link>
                    <Link to="/project/new" className="nav-link">New Project</Link>
                    <Link to="/ticket/new" className="nav-link">New Ticket</Link> */}
                </Nav>
                <IconButton className="appNavbar-notification">
                    <NotificationsNoneIcon style={{color: "grey"}} fontSize="large" />
                </IconButton>
                <Messages count={count} />
                <IconButton className="appNavbar-btn" onClick={handleUserAccount}>
                    {currentUser?
                        <Avatar alt="user IMG" src={userData.photoURL} />
                        :
                        <PersonIcon style={{color: "grey"}} fontSize="large" />
                    }
                </IconButton>
                {/* {(currentUser || demoMode) && <Button onClick={handleLogout} className="mx-2">Log Out</Button>} */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;