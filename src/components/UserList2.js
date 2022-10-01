import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { useUserData } from "../contexts/UserDataContext";
import './UserList2.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';

const backend = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: "210px",
    overflow: "scroll"
  },
}));

export default function UserList2(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState([]);
  const [removeUsers, setRemoveUsers] = useState([]);
  const { userData } = useUserData();
  const {currCollaborators, handleAddUsers, projectId} = props;

  let users = [];

  if(userData.mode === "demo"){
    users = userData.usersAll.filter((user)=> user.private == false)

  }else{
    users = userData.usersAll;
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newSelectedUsers = [...selectedUsers]
    let currRemove = removeUsers.indexOf(value);
    let newRemove = [...removeUsers];

    if (currentIndex === -1) {
      newChecked.push(value);
      newSelectedUsers.push(value._id);

    } else {
      newChecked.splice(currentIndex, 1);
      newSelectedUsers.splice(currentIndex -1 , 1);
    }

    /* 
        this if/else adds a selected user to the newRemove array (function level) if it doesnt already exist
        but only if it already exists in currCollaborators (component level) and then sets the removeUsers
        state object (component level). Once this happens a line of code will conditionally set the styling 
        for the remove btn. If a user that fits this criteria is unchecked and there are no others then 
        the remove button will dissaper.
     */
    if(currRemove === -1 && currCollaborators.includes(value._id)){
      newRemove.push(value)
    }else if(currRemove !== -1 && currCollaborators.includes(value._id)){
      newRemove.splice(currRemove, 1);
    }

    setRemoveUsers(newRemove)
    setSelectedUsers(newSelectedUsers);
    setChecked(newChecked);
  };

  function handleAdd(){
    handleAddUsers(selectedUsers)
    setDisabledUsers(selectedUsers)
    window.location.reload(true)
  }

  async function handleRemove(){

      let updatedUsers = currCollaborators.filter(user=> removeUsers.includes(user))
      let disabled = disabledUsers.filter(user=> removeUsers.includes(user))
      try{
          await axios.put(`${backend}/projects/update-assigned/${projectId}`, {collaborators: updatedUsers}).then((response)=>{
              console.log("response: ", response.data)
              setDisabledUsers(disabled)
              window.location.reload(true)
          }).catch((err)=>{
              console.log("UserList.js>handleRemove>error: ", err)
          })
      }catch(err){
          console.log("UserList.js>handleRemove>error: ", err)
      }
  }

  const removeBtn = {
    default:{
      width: 0, 
      height: 0, 
      padding: 0,  
      border: 'none',
      transition: '0.5s'
    },
    remove:{
      marginLeft: '.5rem',
      maxHeight:'38px',
      transition: '0.5s'
    }
  }

  
  let remove = removeUsers.length > 0? removeBtn.remove : removeBtn.default;

  return (
    <div className='user-list-root'>
        <List dense className={classes.root}>
        {users.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.name}`;
            const disable = currCollaborators.includes(value._id) || disabledUsers.includes(value._id)
            return (
            <ListItem key={value.email} button disabled={disable}>
                <ListItemAvatar>
                <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={value.photoURL}
                />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.name} />
                <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    // disabled={disable}
                />
                </ListItemSecondaryAction>
            </ListItem>
            );
        })}

        </List>
        <div style={{display: 'flex', justifyContent: 'center', width: '80%'}}>
          <Button disabled={selectedUsers.length > 0? false:true} className='user-list-btn btn' onClick={handleAdd}>
              {selectedUsers.length > 1?
                  "Add Users"
                  :
                  "Add User"    
              }
          </Button>
          <Button className='user-list-btn btn btn-danger' onClick={handleRemove} style={remove}>Remove</Button>
        </div>
    </div>
  );
}
