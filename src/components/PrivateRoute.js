import React from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthFirebaseContext';
import { useDemoAuth } from '../contexts/AuthDemoContext';


function PrivateRoute({ children }){
    const { currentUser, authUser } = useAuth();
    const { demoMode, demoUser, getLocalStorageData, updateLocalStorageData } = useDemoAuth();

    /*
    this if statement is necessary to update the demoUsers role and other fields that utilize the role.
    although the role is updated in AuthDemoContext in the various login methods, the demoUser will either
    remain null (its begining state) or the last loggedin demoUser as the demo data only gets reset when
    when demoTrackMateData is not found in local storage. Because we know that the demoUser role has been
    updated during login we can check in this route if that is reflected in demoTrackMateData and if not
    we update it here so when the page loads we have the correct user info.
    */
    if(demoMode){
        let localStorageData = getLocalStorageData()
        if(localStorageData.foundUser.role !== demoUser.role){
            localStorageData.foundUser = demoUser;
            updateLocalStorageData(localStorageData)
        }
    }
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