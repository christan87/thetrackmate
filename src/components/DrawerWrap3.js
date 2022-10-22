import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import {default as LinkReload} from '@material-ui/core/Link';

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
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  LinkStyle: {
    textDecoration: "none", 
    color: "black"
  }
}));



function ResponsiveDrawer({children, window}) {
  //const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { userData } = useUserData();
  const messages = userData.messages.filter(message=> message.read !== true);
  const count = messages.length || userData.messages.length;
  const { currentUser, logout, setCurrentUser, setAuthUser } = useAuth();
  const { demoMode, demoLogout, demoUser } = useDemoAuth();
  const history = useHistory();
  const preventDefault = (event) => event.preventDefault();

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);

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


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const drawer = (
    <div>
        <div className="Drawer-logo">
          <img src={logo} alt="Track Mate Logo"/>
          <h4>Track Mate</h4>
        </div>
        <Divider />
        <List>
        <ListItem button key="Dashboard">
            {/*  window.location.href='/' reloads on the given page and allows the assets to load properly*/}
            {/* <Link to="/" onClick={() => window.location.href='/'} className={clsx(classes.LinkStyle)} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </div>
            </Link> */}
            <LinkReload href="/" className={clsx(classes.LinkStyle)} color="inherit" >
              <div className='d-flex'>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </div>
            </LinkReload>
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
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
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
            handleDrawerToggle={handleDrawerToggle}
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

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
