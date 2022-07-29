import React, { useContext, useState, useEffect } from "react";

const UserDataContext = React.createContext();

export function useUserData() {
    return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
    const [demoUserData, setDemoUserData] = useState();
    const [userData, setUserData] = useState({});

    useEffect(()=>{

    },[]);

    const value = {
        demoUserData, 
        setDemoUserData, 
        userData, 
        setUserData
    }
    
    return(
        <UserDataContext.Provider value={value}>
            { children }
        </UserDataContext.Provider>
    )
}