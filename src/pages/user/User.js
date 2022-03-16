import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import { useUserData } from '../../contexts/UserDataContext';
import UserProf from '../dashboard/User'

export default function User(){
    const { id } = useParams();
    const { currentUser } = useAuth();
    const { demoUser } = useDemoAuth();
    const { userData } = useUserData();

    return(
        <div>
            <UserProf imgURL={userData.photoURL} />
        </div>
    )
}