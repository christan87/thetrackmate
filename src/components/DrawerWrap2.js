import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppNavbar2 from './AppNavbar2';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import PeopleIcon from '@material-ui/icons/People'; //collab

import { Link, useNavigate as useHistory } from 'react-router-dom';

import EnlargeModal from '../pages/analytics/EnlargeModal';
import NewTicket from '../pages/ticket/NewTicket'
import NewProject from '../pages/project/NewProject'

import { useUserData } from '../contexts/UserDataContext'

import { useAuth } from "../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../contexts/AuthDemoContext";
import { 
  Button
} from 'react-bootstrap';

import './DrawerWrap2.css'
import logo from '../assets/LogoDesignColor.png';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  LinkStyle: {
    textDecoration: "none", 
    color: "black"
  }
}));

export default function DrawerWrap2({children}) {
  const classes = useStyles();
  const { userData } = useUserData();
  const count = userData.messages.length;

  const { currentUser, logout, setCurrentUser, setAuthUser } = useAuth();
  const { demoMode, demoLogout, demoUser } = useDemoAuth();
  const history = useHistory();

  const preventDefault = (event) => event.preventDefault();

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  function onHide(){
    setModalShow(false)
}

function onShow(event){
    preventDefault(event)
    setModalShow(true)
}

function onHide2(){
  setModalShow2(false)
}

function onShow2(event){
    preventDefault(event)
    setModalShow2(true)
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={`${classes.drawer} Drawer-main`}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className="Drawer-logo">
          <img src={logo} alt="Track Mate Logo"/>
          <h4>Track Mate</h4>
        </div>
        <Divider />
        <List>
        <ListItem button key="Dashboard">
            <Link to="/" className={clsx(classes.LinkStyle)} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </div>
            </Link>
          </ListItem>
          
          <ListItem>
            <Link to="/mail" className={clsx(classes.LinkStyle)} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Mail"/>
              </div>
            </Link>
          </ListItem>

          <ListItem button key="Users">
            <Link to="/users" className={clsx(classes.LinkStyle)} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Users"/>
              </div>
            </Link>
          </ListItem>

          <ListItem button key="DataAnalytics">
            <Link to="/analytics" className={clsx(classes.LinkStyle)} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><BlurOnIcon /></ListItemIcon>
                <ListItemText primary="Data Analytics"/>
              </div>
            </Link>
          </ListItem>
          
          <ListItem button key="NewProject">
            <Link to="#" className={clsx(classes.LinkStyle)} onClick={onShow2} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><PostAddIcon /></ListItemIcon>
                <ListItemText primary="New Project"/>
              </div>
            </Link>
          </ListItem>

          <ListItem button key="NewTicket">
            <Link to="#" className={clsx(classes.LinkStyle)} onClick={onShow} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><NoteAddIcon /></ListItemIcon>
                <ListItemText primary="New Ticket"/>
              </div>
              {/* for some reason the onshow/onhide not being triggered. use console to toggle state */}
            </Link>
          </ListItem>
          <Divider />
        </List>
        <div style={{
          height:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div style={{height: "20px", width:"100%"}}></div>
        
          {(currentUser || demoMode) && <Button onClick={handleLogout} className="mx-2 mb-5 btn btn-danger">Log Out</Button>}
        </div>
      </Drawer>
      <main className={classes.content}>
        <AppNavbar2 
            style={{display: "block", minHeight: "64px"}} 
            // classes={classes} open={open} 
            // handleDrawerOpen={handleDrawerOpen}
            position="fixed"
            // className={clsx(classes.appBar, {
            // [classes.appBarShift]: open,
            // })}  
            count={count}
        />
        {children}
        <EnlargeModal show={modalShow} onHide={onHide} >
          <NewTicket onHide={onHide} />
        </EnlargeModal>
        <EnlargeModal show={modalShow2} onHide={onHide2} >
          <NewProject onHide={onHide2} />
        </EnlargeModal>
      </main>
    </div>
  );
}
