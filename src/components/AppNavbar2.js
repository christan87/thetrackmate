import React from 'react'
import { Link, useNavigate as useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../contexts/AuthDemoContext";
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
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
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [drawerIcon, setDrawerIcon] = React.useState(false);
    const history = useHistory();

    // let size = window.innerWidth;
    // React.useEffect(()=>{
    //     if(size < 600){
    //         size = window.innerWidth;
    //         setDrawerOpen(false)
    //         if(drawerIcon === false){
    //             setDrawerIcon(true)
    //         }
            
    //     }else{
    //         setDrawerOpen(true)
    //         if(drawerIcon === true){
    //             setDrawerIcon(false)
    //         }
            
    //     }
    // },[])

    // window.onresize = ()=>{
    //     size = window.innerWidth;
    //     if(size < 600 ){
    //         setDrawerOpen(false) 
    //         setDrawerIcon(true)
    //     }else if(size >= 600 ){
    //         setDrawerOpen(true)
    //         setDrawerIcon(false)
    //     }
    // }

    //better than using window.onresize
    const layoutChangedCallback = (matches) => {
        //console.log(matches ? "I'm on desktop!" : "I'm on mobile!");
        //if matches = true you're above 600px else you're bellow
        if(matches){
            if(drawerOpen === false){
                setDrawerOpen(true)
            }
            if(drawerIcon === true){
                setDrawerIcon(false)
            }
            
        }else{
            if(drawerOpen === true){
                setDrawerOpen(false)
            }
            if(drawerIcon === false){
                setDrawerIcon(true)
            }
        }
      }
       
      // set media query
      const mql = window.matchMedia('(min-width: 600px)');
      
      // set listener to run callback
      mql.addEventListener('change', (e) => layoutChangedCallback(e.matches));
      
      // the callback doesn't run immediately, so we run it manually once
      layoutChangedCallback(mql.matches);

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
        history("/user")
    }

    function handleDrawerToggle(){
        if(drawerOpen === false){
            props.handleDrawerToggle()
        }
    }

    return(
        //minHeight stops the height change when the drawer opens
        <Navbar className="appNavbar" expand="lg" style={{minHeight: "64px", padding: 0}} > 
            <Container fluid style={{display: 'flex'}}>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="appNavbar-nav me-auto my-2 my-lg-0"
                    style={{ maxHeight: '150px' }}
                    navbarScroll
                >
                </Nav>
                {/* <IconButton className="appNavbar-notification">
                    <NotificationsNoneIcon style={{color: "grey"}} fontSize="large" />
                </IconButton> */}
                <Messages count={count} />
                <IconButton className="appNavbar-btn" onClick={handleUserAccount}>
                    {currentUser?
                        <Avatar alt="user IMG" src={userData.photoURL} />
                        :
                        <PersonIcon style={{color: "grey"}} fontSize="large" />
                    }
                </IconButton>
                <IconButton style={{display:'block'}} className="appNavbar-btn">
                    {drawerIcon?
                        <MenuOpenIcon style={{color: "grey"}} fontSize="large" onClick={handleDrawerToggle}/>
                        :
                        <></>
                    }
                </IconButton>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;