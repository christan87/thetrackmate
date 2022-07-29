import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import users from '../services/demoUsers'
import { useUserData } from '../contexts/UserDataContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex', [this makes the last names go beneath the first names]
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    overflow: "scroll",
    minWidth: "12.5rem"
  },
  list:{
    listStyleType: "none",
    paddingLeft: "1rem",
  },
  selected:{
    backgroundColor: "gray"
  }
}));


/*
The UserLi component returns an <li> 
*/
function UserLI({children, id, setUserList, getUserList, selectedId}){
    const classes = useStyles();
    const [selected, setSelected] = useState(selectedId)
    const userList = getUserList();
    let newList = [...userList];

    const handleClick = () => {
        if(!selected){ // we use !selected because the if executes before this value can be changed
            //console.log("Selected : ", id)
            if(!newList.includes(id)){
                newList.push(id)
                setUserList(newList)
            }
        }else{
            //console.log("De-Selected : ", id)
            if(newList.indexOf(id) !== -1){
                newList.splice(newList.indexOf(id), 1)
                setUserList(newList)
            }
        }
        setSelected(!selected)
    }

    return(
        <li onClick={handleClick} className={`${selected&&classes.selected}`}>{children}</li>
    )
    
}

//This component takes in a project as a prop <UserList project={projcect} />

export default function UserList({project, ticket}) {
  const classes = useStyles();
  const [userList, setUserList] = useState([])
  
  const { userData } = useUserData()
  const users = userData.usersAll;

  const selectedUsers = [];

  if(project){
    project.collaborators.forEach((col)=>{
      selectedUsers.push(col.id)
    })
  }else{
    ticket.assignedDevs.forEach((col)=>{
      selectedUsers.push(col.id)
    })
  }
  
  // project.collaborators.forEach((col)=>{
  //   selectedUsers.push(col.id)
  // })

  /*
  this useEffect is more or less set up to do the same thing as aboue
  which is loop through project.collaborators and and pushes the ids to
  an array. the reason this is done 'twice' is because the first array
  selectedUsers is saved and used to set the selectedId prop for <UserLi>.
  In use effect we're using tempUsers to set userList with setUserList
  which 'can't' be called outside useEffect as if it's called in our 
  functions render it will cause state to update which causes a re-render
  which will then create an infinite loop and as useEffect is oly called
  once this is not an issue. The problem is that we wont have access to 
  temp users and if we use it to set selectedUsers then the empty array
  will be quiried before its set.
  */
  
  useEffect(()=>{
    const tempUsers = [];
      if(project){
        project.collaborators.forEach((col)=>{
          tempUsers.push(col.id)
        })
      }else{
        ticket.assignedDevs.forEach((col)=>{
          tempUsers.push(col.id)
        })
      }
    setUserList(tempUsers)
  },[])

  function getUserList(){
    return userList;
  }

  return (
    <>
    <Paper className={classes.root}>
        <ul className={classes.list}>
            {users.map((user) => (
                <UserLI selectedId={selectedUsers.includes(user.id)} getUserList={getUserList} setUserList={setUserList} key={user.name} value={user.name} id={user.id}>
                    {user.name}
                </UserLI>
            ))}
        </ul>
    </Paper>
    </>
  );
}
