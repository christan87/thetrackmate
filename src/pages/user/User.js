import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import UserProf from '../dashboard/User'

export default function User(){
    const { id } = useParams();
    const { currentUser } = useAuth();
    const { demoUser } = useDemoAuth();

    if(id){
        console.log("collab-view")
    }else{
        console.log("user-view")
    }


    return(
        <div>
            <UserProf />
        </div>
    )
}