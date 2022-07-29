import React from "react";
import { useAuth } from "../../contexts/AuthFirebaseContext";

export default function DisplayName(){
    const { currentUser } = useAuth();
    return(
        <>
            {!currentUser?
                <></>
                :
                <>{currentUser.displayName?  
                    <h2 className="text-center mb-4">{currentUser.displayName}</h2> 
                    : 
                    <h2 className="text-center mb-4">{currentUser.email}</h2> 
                }</>
            }

        </>
    )
}