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
  const { userData } = useUserData();
  const {currCollaborators, handleAddUsers} = props;

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

    if (currentIndex === -1) {
      newChecked.push(value);
      newSelectedUsers.push(value._id);

    } else {
      newChecked.splice(currentIndex, 1);
      newSelectedUsers.splice(currentIndex -1 , 1);
    }

    setSelectedUsers(newSelectedUsers);
    setChecked(newChecked);
  };

  function handleAdd(){
    handleAddUsers(selectedUsers)
    setDisabledUsers(selectedUsers)
  }

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
                    disabled={disable}
                />
                </ListItemSecondaryAction>
            </ListItem>
            );
        })}

        </List>
        <Button disabled={selectedUsers.length > 0? false:true} className='user-list-btn btn' onClick={handleAdd}>
            {selectedUsers.length > 1?
                "Add Users"
                :
                "Add User"    
            }
        </Button>
    </div>
  );
}
