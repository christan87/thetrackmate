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
import axios from 'axios'
/*
    fix Users and Data Analytics
*/
export default function LoadDemoData({children}){
    const { 
        demoMode, 
        demoUser, 
        setMessages, 
        setMessageCount 
    } = useDemoAuth();

    const { currentUser } = useAuth();
    const { userData, setUserData } = useUserData();
    const [loading, setLoading] = useState(true)
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
        }catch(e){
            console.log("LoadDemoData>setTheMessages: ", e)
        }

    }

    function setDemoTicketsAll(){
        try{
            const ticketsAll = demoTickets;
            data.ticketsAll = ticketsAll;
        }catch(e){
            console.log("LoadDemoData>setDemoTicketsAll: ", e)
        }
    }

    function setDemoProjectsAll(){
        try{
            const projectsAll = demoProjects;
            data.projectsAll = projectsAll;
        }catch(e){
            console.log("LoadDemoData>setDemoProjectsAll: ", e)
        }
    }

    function setDemoUsersAll(){
        try{
            const usersAll = demoUsers;
            data.usersAll = usersAll;
        }catch(e){
            console.log("LoadDemoData>setDemoUsersAll: ", e)
        }
    }

    function setDemoProjectCommentsAll(){
        try{
            const projectCommentsAll = demoProjectComments;
            data.projectCommentsAll = projectCommentsAll;
        }catch(e){
            console.log("LoadDemoData>setDemoProjectCommentsAll: ", e)
        }
    }

    function setDemoTicketCommentsAll(){
        try{
            const ticketCommentsAll = demoTicketComments;
            data.ticketCommentsAll = ticketCommentsAll;
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
        await axios.get(`http://localhost:5000/users/auth/${uid}`).then((response)=>{
            user =  response.data
        }).catch((error)=>{
            console.log("LoadDemoData>findUserByUID>error: ", error)
        });
        return user;
    }

    async function addUserToDatabase(user){
        await axios.post("http://localhost:5000/users/add", user).then((response)=>{
            console.log("response: ", response.data)
        }).catch((error)=>{
            console.log("LoadDemoData>addUserToDatabase>error: ", error)
        })
    }

    async function checkForUserBeforAddAndUpdate(uid, email){
        let accessToken = JSON.parse(window.localStorage.getItem("fbAccessToken"))
        if(accessToken !== null && accessToken !== undefined){
            accessToken = accessToken.token
        }
        const foundUser = await findUserByUID(uid);
        const newUser = {
            useremail: email,
            userAuthId: uid
        }
        console.log("found user: ", foundUser)
        if(accessToken !== null && accessToken !== undefined){
            newUser.accessToken = accessToken;
            window.localStorage.removeItem("fbAccessToken")
            if(foundUser !== null && foundUser !== undefined && foundUser.accessToken !== newUser.accessToken){
                await axios.post(`http://localhost:5000/users/update/${foundUser._id}`, newUser).then((response)=>{
                    console.log("response: ", response.data)
                }).catch((error)=>{
                    console.log("LoadDemoData>checkForUserBeforAdd>error: ", error)
                })
            }
        }
        if(foundUser === null || foundUser === undefined){
            await addUserToDatabase(newUser)
        }
    }

    function setPhotoURL(){
        try{
            let photoURL = currentUser.photoURL;
            console.log("curr: ", currentUser)
            if(photoURL.includes("facebook")){
                const accessToken = currentUser.accessToken
                photoURL = photoURL + `?access_token=${accessToken}`;
            }
            data.photoURL = photoURL;
        }catch(e){
            console.log("LoadDemoData>setPhotoURL: ", e)
        }
    }

    useEffect(async ()=>{
        if(demoMode){
            console.log("User Account Type: Demo")
            setTheDemoMessages()
            setDemoTicketsAll()
            setDemoProjectsAll()
            setDemoUsersAll()
            setDemoProjectCommentsAll()
            setDemoTicketCommentsAll()
            setDemoUserId()

        }else if(currentUser){
            console.log("User Account Type: Autheneticated")
            await checkForUserBeforAddAndUpdate(currentUser.uid, currentUser.email)
            data = {
                messages: [],
                count: 0,
                ticketsAll: [],
                projectsAll: [],
                usersAll: [],
                projectCommentsAll: [],
                ticketCommentsAll: [],
                id: currentUser.uid

            }
            setPhotoURL();
        }else{
            console.log("User Account Type: No User Detected")
            data = {}
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