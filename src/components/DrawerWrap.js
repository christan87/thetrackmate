import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppNavbar from './AppNavbar';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People'; //collab
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import EnlargeModal from '../pages/analytics/EnlargeModal';
import NewTicket from '../pages/ticket/NewTicket'
import NewProject from '../pages/project/NewProject'

// import { useDemoAuth } from '../contexts/AuthDemoContext';
import { useUserData } from '../contexts/UserDataContext'
// import demoMessages from '../services/demoMessages';
import "./DrawerWrap.css"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  LinkStyle: {
    textDecoration: "none", 
    color: "black"
  }
}));

export default function DrawerWrap({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const preventDefault = (event) => event.preventDefault();

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  // const { demoUser, demoUserData } = useDemoAuth();
  const { userData } = useUserData();
  // const count = demoUserData.messageCount
  const count = userData.messages.length;

  function onHide(){
      setModalShow(false)
  }

  function onShow(event){
      preventDefault(event)
      setModalShow(true)
      handleDrawerClose()
  }

  function onHide2(){
    setModalShow2(false)
  }

  function onShow2(event){
      preventDefault(event)
      setModalShow2(true)
      handleDrawerClose()
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
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

          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        style={{paddingTop: 0}}
      >
        <AppNavbar 
            style={{display: "block", minHeight: "64px"}} 
            classes={classes} open={open} 
            handleDrawerOpen={handleDrawerOpen}
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}  
            count={count}
        />
            {children}
            <EnlargeModal show={modalShow} onHide={onHide} openDrawer={handleDrawerOpen} >
              <NewTicket onHide={onHide} />
            </EnlargeModal>
            <EnlargeModal show={modalShow2} onHide={onHide2} openDrawer={handleDrawerOpen} >
              <NewProject onHide={onHide2} />
            </EnlargeModal>
      </main>
    </div>
  );
}
