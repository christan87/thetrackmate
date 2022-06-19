import React from 'react';
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

import { Link } from 'react-router-dom';

import EnlargeModal from '../pages/analytics/EnlargeModal';
import NewTicket from '../pages/ticket/NewTicket'
import NewProject from '../pages/project/NewProject'

import { useUserData } from '../contexts/UserDataContext'

import './DrawerWrap2.css'
import logo from '../assets/LogoDesignColor.png';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
}));

export default function DrawerWrap2({children}) {
  const classes = useStyles();
  const { userData } = useUserData();
  const count = userData.messages.length;

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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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
      </main>
    </div>
  );
}
