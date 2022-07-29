import React, { useContext, useState, useEffect } from "react";
import demoMessages from "../services/demoMessages";

const DemoAuthContext = React.createContext();

export function useDemoAuth() {
    return useContext(DemoAuthContext);
}

export function DemoAuthProvider({ children }) {
    const [demoMode, setDemoMode] = useState(false);
    const [demoRole, setDemoRole] = useState(null);
    const [demoLoading, setDemoLoading] = useState(true);

    const [messages, setMessages] = useState([]);
    const [messageCount, setMessageCount] = useState(0);
    let demoUserData = {
        messages: messages,
        messageCount: messageCount
    } 
    
    let demoUser = {
        userName: "Demo User",
        email: "user@demo.com",
        authId: "D123456",
        role: demoRole,
        _id: `${demoRole}-D123456`,
        avatar:"",
        messageCount: messageCount
    }

    function adminDemoLogin(){
        setDemoRole("admin");
        try{
            window.localStorage.setItem("demoRole", JSON.stringify({demoRole: "admin"}));
            setDemoMode(true)
        }catch(e){
            console.log("DemoLogin.jd>handleAdminDemoLogin ", e)
        }
    }

    function collabDemoLogin(){
        setDemoRole("collaborator");
        try{
            window.localStorage.setItem("demoRole", JSON.stringify({demoRole: "collaborator"}));
            setDemoMode(true)
        }catch(e){
            console.log("DemoLogin.jd>handleCollabDemoLogin ", e)
        }
    }

    function userDemoLogin(){
        setDemoRole("user");
        try{
            window.localStorage.setItem("demoRole", JSON.stringify({demoRole: "user"}));
            setDemoMode(true)
        }catch(e){
            console.log("DemoLogin.jd>handleUserDemoLogin ", e)
        }
    }

    function guestDemoLogin(){
        setDemoRole("guest");
        try{
            window.localStorage.setItem("demoRole", JSON.stringify({demoRole: "guest"}));
            setDemoMode(true)
        }catch(e){
            console.log("DemoLogin.jd>handleGuestDemoLogin ", e)
        }
    }

    function demoLogout(){
        setDemoMode(false);
        setDemoRole(null);
        window.localStorage.removeItem("demoRole");
    }

    function updateLocalStorageData(demoTrackMateData){
        window.localStorage.setItem("demoTrackMateData", JSON.stringify(demoTrackMateData));
    }

    function getLocalStorageData(){
        return JSON.parse(window.localStorage.getItem("demoTrackMateData"))
    }

    function removeLocalStorageData(){
        window.localStorage.removeItem("demoTrackMateData");
    }

    useEffect(()=>{
        //Determines if user already logged in under a demo role  
        const demoRole = JSON.parse(window.localStorage.getItem("demoRole"));
        if(demoRole !== null || undefined){
            setDemoMode(true)
            setDemoRole(demoRole.demoRole);
        }

        setDemoLoading(false)
    },[])

    const value = {
        demoMode,
        setDemoMode,
        demoUser,
        setDemoRole,
        demoLoading,
        demoLogout,
        adminDemoLogin,
        collabDemoLogin,
        userDemoLogin,
        guestDemoLogin,
        setMessageCount,
        demoUserData,
        setMessages,
        updateLocalStorageData,
        getLocalStorageData,
        removeLocalStorageData
    }
    
    return(
        <DemoAuthContext.Provider value={value}>
            { children }
        </DemoAuthContext.Provider>
    )

}