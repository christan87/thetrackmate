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
/*
    change projectssALl to projectsAll
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
            const projectssAll = demoProjects;
            data.projectssAll = projectssAll;
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

    useEffect(()=>{
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