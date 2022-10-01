import React, { useEffect, useState } from "react";
import demoMessages from "./demoMessages";
import demoProjectComments from "./demoProjectComments"
import demoProjects from "./demoProjects"
import demoTicketComments from "./demoTicketComments"
import demoTickets from "./demoTickets"
import demoUsers from "./demoUsers"
import { useDemoAuth } from '../contexts/AuthDemoContext';
import { useAuth } from '../contexts/AuthFirebaseContext';
import { useUserData } from '../contexts/UserDataContext';
import { useNavigate as useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const backend = process.env.REACT_APP_API;

export default function LoadDemoData({children, page}){
    const { 
        demoMode, 
        demoUser, 
        setMessages, 
        setMessageCount,
        updateLocalStorageData, 
        getLocalStorageData, 
        removeLocalStorageData  
    } = useDemoAuth();

    const { currentUser } = useAuth();
    const { userData, setUserData } = useUserData();
    const [loading, setLoading] = useState(true)
    const { AltUserId } = useParams()
    const history = useHistory();

    let localStorageData = getLocalStorageData() || {
        foundUser: demoUser,
        name: demoUser.userName,
        mode: "demo",
        messages: [],
        count: 0,
        ticketsAll: [],
        projectsAll: [],
        usersAll: [],
        projectCommentsAll: [],
        ticketCommentsAll: [],
        id: demoUser._id
    }

    let data = {
        
    }

    function setTheDemoMessages(){
        try{
            const messages = demoMessages.filter((message)=> message.recipientId === demoUser._id);
            const count = messages.length
            data.messages = messages;
            data.count = count;
            setMessages(messages)
            setMessageCount(count);
            localStorageData.messages = messages;
            localStorageData.count = count;
            updateLocalStorageData(localStorageData)
        }catch(e){
            console.log("LoadDemoData>setTheMessages: ", e)
        }

    }

    function setDemoTicketsAll(){
        try{
            const ticketsAll = demoTickets;
            data.ticketsAll = ticketsAll;
            localStorageData.ticketsAll = ticketsAll;
            updateLocalStorageData(localStorageData)
        }catch(e){
            console.log("LoadDemoData>setDemoTicketsAll: ", e)
        }
    }

    function setDemoProjectsAll(){
        try{
            const projectsAll = demoProjects;
            data.projectsAll = projectsAll;
            localStorageData.projectsAll = projectsAll;
            updateLocalStorageData(localStorageData)
        }catch(e){
            console.log("LoadDemoData>setDemoProjectsAll: ", e)
        }
    }

    function setDemoUsersAll(){
        try{
            const usersAll = demoUsers;
            data.usersAll = usersAll;
            localStorageData.usersAll = usersAll;
            updateLocalStorageData(localStorageData)
        }catch(e){
            console.log("LoadDemoData>setDemoUsersAll: ", e)
        }
    }

    function setDemoProjectCommentsAll(){
        try{
            const projectCommentsAll = demoProjectComments;
            data.projectCommentsAll = projectCommentsAll;
            localStorageData.projectCommentsAll = projectCommentsAll;
            updateLocalStorageData(localStorageData)
        }catch(e){
            console.log("LoadDemoData>setDemoProjectCommentsAll: ", e)
        }
    }

    function setDemoTicketCommentsAll(){
        try{
            const ticketCommentsAll = demoTicketComments;
            data.ticketCommentsAll = ticketCommentsAll;
            localStorageData.ticketCommentsAll = ticketCommentsAll;
            updateLocalStorageData(localStorageData)
        }catch(e){
            console.log("LoadDemoData>setDemoTicketCommentsAll: ", e)
        }
    }

    function setDemoUserId(){
        try{
            const id = demoUser._id;
            data.id = id;
        }catch(e){
            console.log("LoadDemoData>setDemoUserId: ", e)
        }
    }

    async function findUserByUID(uid){
        let user;
        await axios.get(`${backend}/users/auth/${uid}`).then((response)=>{
            user =  response.data
        }).catch((error)=>{
            console.log("LoadDemoData>findUserByUID>error: ", error)
        });
        data.foundUser = user;
        return user;
    }

    // async function addUserToDatabase(user){
    //     await axios.post("http://localhost:5000/users/add", user).then((response)=>{
    //         console.log("response: ", response.data)
    //     }).catch((error)=>{
    //         console.log("LoadDemoData>addUserToDatabase>error: ", error)
    //     })
    // }

    // async function checkForUserBeforAddAndUpdate(uid, email){
    //     let accessToken = JSON.parse(window.localStorage.getItem("fbAccessToken"))
    //     if(accessToken !== null && accessToken !== undefined){
    //         accessToken = accessToken.token
    //     }
    //     const foundUser = await findUserByUID(uid);
    //     const newUser = {
    //         useremail: email,
    //         userAuthId: uid
    //     }
    //     console.log("found user: ", foundUser)
    //     if(foundUser === null || foundUser === undefined){
    //         await addUserToDatabase(newUser)
    //         await checkForUserBeforAddAndUpdate(uid, email)
    //     }
    //     if(accessToken !== null && accessToken !== undefined && accessToken !== ""){
    //         newUser.accessToken = accessToken;
    //         window.localStorage.removeItem("fbAccessToken")
    //         if(foundUser !== null && foundUser !== undefined && foundUser.accessToken !== newUser.accessToken){
    //             await axios.post(`http://localhost:5000/users/update/${foundUser._id}`, newUser).then((response)=>{
    //                 console.log("response: ", response.data)
    //             }).catch((error)=>{
    //                 console.log("LoadDemoData>checkForUserBeforAdd>error: ", error)
    //             })
    //             await checkForUserBeforAddAndUpdate(uid, email)
    //             //the reload is neccesary for the image to be visible on first login
    //             window.location.reload()
    //         }
    //     }
    //     try{
    //         if(foundUser.accessToken !== null && foundUser.accessToken !== undefined){
    //             setPhotoURL(foundUser.accessToken)
    //         }
    //     }catch(e){
    //         console.log("LoadDemoData>checkForUserBeforAddAndUpdate>: ", e)
    //     }

        
    // }

    async function updateUserPhoto(){
        const foundUser = await findUserByUID(currentUser.uid)
        let photoURL = currentUser.photoURL
        if(photoURL.includes("facebook")){
            photoURL = photoURL + `?access_token=${foundUser.accessToken}`;
        }
        const newUser = {
            email: currentUser.email,
            authId: currentUser.uid,
            photoURL: photoURL
        }
        try{
            await axios.post(`${backend}/users/update/${foundUser._id}`, newUser).then(
                (response)=>{
                    console.log("response: ", response.data)
                }
            ).catch(
                (err)=>{
                    console.log("LoadDemoData>updateUserPhoto>error: ", err)
                }
            )

        }catch(err){
            console.log("LoadDemoData>updateUserPhoto>: ", err)
        }
    }

    async function setPhotoURL(){
        try{
            const foundUser = await findUserByUID(currentUser.uid)
            console.log("Found User: ", foundUser)
            let photoURL = currentUser.photoURL;
            if(photoURL.includes("facebook")){
                photoURL = photoURL + `?access_token=${foundUser.accessToken}`;
            }
            data.photoURL = photoURL;
            
        }catch(e){
            console.log("LoadDemoData>setPhotoURL: ", e)
        }
    }
    if(page){console.log("Page:", page )}
    async function setProjects(){
        let projects = [];
        try{
            const foundUser = await findUserByUID(currentUser.uid)
            let useId = foundUser._id;  // allows for correct projects to be loaded on the AltUser page
            if(AltUserId && page === 'AltUser'){ useId = AltUserId; console.log("useId:",useId)} 
            await axios.get(`${backend}/projects/user/${useId}`).then((response)=>{
                if(response.data !== null && response.data !== undefined){
                    projects = response.data;
                    data.projectsAll = response.data.projects
                }
            }).catch((error)=>{
                console.log("LoadDemoData>setProjects: ", error)
            })
        }catch(e){
            console.log("LoadDemoData>setProjects: ", e)
        }
        return projects;
    }
    
    async function setTickets(){
        let tickets = [];
        try{
            const foundUser = await findUserByUID(currentUser.uid)
            
            let useId = foundUser._id; // allows for correct tickets to be loaded on the AltUser page
            if(AltUserId && page === 'AltUser') useId = AltUserId; 
            await axios.get(`${backend}/tickets/user/${useId}`).then((response)=>{
                if(response.data !== null && response.data !== undefined){
                    tickets = response.data;
                    data.ticketsAll = tickets.tickets
                }
            }).catch((error)=>{
                console.log("LoadDemoData>setTickets: ", error)
            })
        }catch(e){
            console.log("LoadDemoData>setTickets: ", e)
        }
        return tickets;
    }

    async function setUsers(){
        try{
            let users = [];
            await axios.get(`${backend}/users`).then((response)=>{
              users = response.data;
              data.usersAll = users;
            }).catch((error)=>{
                console.log("LoadDemoData>setUsers1: ", error)
            })
            return users;
        }catch(e){
            console.log("LoadDemoData>setUsers2: ", e)
        }
    }

    async function setMessagesAll(){
        try{
            const foundUser = await findUserByUID(currentUser.uid)
            data.messages = foundUser.messages
        }catch(err){
            console.log("LoadDemoData>setMessagesAll: ", err)
        }
    }

    useEffect(async ()=>{
        if(demoMode){
            console.log("User Account Type: Demo")
            data.mode = "demo"
            data.foundUser = demoUser;
            if(getLocalStorageData() === null || getLocalStorageData() === undefined){            
            setTheDemoMessages()
            setDemoTicketsAll()
            setDemoProjectsAll()
            setDemoUsersAll()
            setDemoProjectCommentsAll()
            setDemoTicketCommentsAll()
            setDemoUserId()
            }else{
                data = localStorageData;
            }
            
        }else if(currentUser){
            console.log("User Account Type: Autheneticated")
            data = {
                name: currentUser.displayName,
                mode: "live",
                messages: [],
                count: 0,
                ticketsAll: [],
                projectsAll: [],
                usersAll: [],
                projectCommentsAll: [],
                ticketCommentsAll: [],
                id: currentUser.uid
            }
            //await checkForUserBeforAddAndUpdate(currentUser.uid, currentUser.email)
            await setPhotoURL();
            await updateUserPhoto();
            await setProjects();
            await setTickets();
            await setUsers();
            await setMessagesAll();
        }else{
            console.log("User Account Type: No User Detected")
            data = {}
            history("/login")
        }
        setUserData(data);

        //this and the conditional bellow prevents the calls to setState
        //from running be while rendering another component
        setLoading(false)
    },[])
    
    return (
        <>
            {
                loading? 
                    <></>
                    :
                    <>{children}</>
            }
        </>
    )

}