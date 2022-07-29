import React from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthFirebaseContext';
import { useDemoAuth } from '../contexts/AuthDemoContext';


function PrivateRoute({ children }){
    const { currentUser, authUser } = useAuth();
    const { demoMode } = useDemoAuth();
    /*
    The mongoId is set on the currentUser in the Private route
    because the async function that fetches the authenticated user
    from firebase needs time to complete in the AuthContext.js. The
    firebase uid is used to finde the user in the mongo databse and 
    the mongo _id is used to associate the user with comments etc...
    */
    if(currentUser && authUser && !currentUser.mongoId){
        currentUser.mongoId = authUser._id;
    }
    return currentUser ? 
        children 
        : 
        demoMode?
            children
            :
            <Redirect to="/login" />

}

export default PrivateRoute;