import React, { useContext, useState, useEffect} from "react";
import axios from "axios";
import { auth } from '../firebase';
import { 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    getAuth, 
    signInWithPopup,
    updateProfile, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const fbAuth = getAuth();
const backend = process.env.REACT_APP_API;

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    //authUser is the user in the mongodb database
    const[authUser, setAuthUser] = useState();
    //currentUser is the user in the firebase databse
    const[currentUser, setCurrentUser] = useState();
    /*
        Firebas keeps track of auth by setting local storage 'for' us as well as
        tokens which means ther's a 'loading' state we need to keep track of when
        our AuthProvider is instantiated that last until the user is authenticated,
        see the use effect instance for more...
    */
    const[loading, setLoading] = useState(true)
    
    async function findUserByUID(uid){
        let user;
        await axios.get(`${backend}/users/auth/${uid}`).then((response)=>{
            user =  response.data
        }).catch((error)=>{
            console.log("LoadDemoData>findUserByUID>error: ", error)
        });
        return user;
    }

    async function addUserToDatabase(user){
        await axios.post(`${backend}/users/add`, user).then((response)=>{
            console.log("response: ", response.data)
        }).catch((error)=>{
            console.log("LoadDemoData>addUserToDatabase>error: ", error)
        })
    }

    async function checkForUserBeforAddAndUpdate(uid, email, accessToken=""){

        const foundUser = await findUserByUID(uid);
        const newUser = {
            email: email,
            authId: uid,
        }
        console.log("AuthFirebaseContext>found user: ", foundUser)
        if(foundUser === null || foundUser === undefined){
            await addUserToDatabase(newUser)
            await checkForUserBeforAddAndUpdate(uid, email, accessToken)
        }
        if(accessToken !== null && accessToken !== undefined && accessToken !== ""){
            newUser.accessToken = accessToken;
            if(foundUser !== null && foundUser !== undefined && foundUser.accessToken !== newUser.accessToken){
                await axios.post(`${backend}/users/update/${foundUser._id}`, newUser).then((response)=>{
                    console.log("response: ", response.data)
                }).catch((error)=>{
                    console.log("LoadDemoData>checkForUserBeforAdd>error: ", error)
                })
                await checkForUserBeforAddAndUpdate(uid, email, accessToken)
                //the reload is neccesary for the image to be visible on first login
                window.location.reload()
            }
        }       
    }

    function googleSignIn(){
        return auth.signInWithPopup(provider).then(async(result)=>{
            const user = result.user;
            await checkForUserBeforAddAndUpdate(user.uid, user.email)
        }).catch((error)=>{

        });
    }

    function fbSignIn(){
        return signInWithPopup(fbAuth, fbProvider).then(async(result)=>{
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            await checkForUserBeforAddAndUpdate(user.uid, user.email, accessToken)
            //window.localStorage.setItem("fbAccessToken", JSON.stringify({token: accessToken}))
        }).catch((error)=>{
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
        })
    }

    function signup(email, password) {
        //this returns a promise which we will return and use inside SignUp
       return auth.createUserWithEmailAndPassword(email, password); 
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        setCurrentUser(null)
        setAuthUser(null)
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function updateDisplayName(user, name){
        updateProfile(user, {displayName: name}).then(()=>{

        }).catch(err=>(
            console.log("updateDisplayName: ", err)
        ))
    }

    function updatePhotoURL(user, url){
        updateProfile(user, {photoURL: url}).then(()=>{

        }).catch(err=>(
            console.log("updateDisplayName: ", err)
        ))
    }

    function updatePassword(password){
        return currentUser.updatePassword(password);
    }

    useEffect(()=>{
        /*
            this function returns a method that will 'unsibscribe' us from this
            event listener when the component 'unmounts' which is what will happen
            when we 'return' unsubscribe. Also, passing the empty array [] makse sure
            that whatever is in useEffect will only run once when the component is mounted
        */
        const unsubscribe = auth.onAuthStateChanged(async user=>{

            /*
            this if(){...} is only usable when we create the backend
            */

            // if(user){
            //     await axios.get(`http://localhost:5000/users/auth/${user.uid}`).then(
            //         res => {
            //             setAuthUser(res.data)
            //         }
            //     )
            // }
            setCurrentUser(user)
            //need to be set 'after' user
            setLoading(false);
        })
        return unsubscribe();
    },[]);
    
    const getCurrentUser = ()=>{
        return new Promise((resolve, reject)=>{
            const unsubscribe = auth.onAuthStateChanged(user=>{
                unsubscribe()
                setCurrentUser(user)
                resolve(user)
            }, reject)
        })
    }

    const value = {
        currentUser,
        authUser,
        getCurrentUser,
        setCurrentUser,
        setAuthUser,
        loading,
        login,
        logout, 
        signup,
        resetPassword,
        updateEmail,
        updatePassword,
        updateDisplayName,
        updatePhotoURL,
        googleSignIn,
        fbSignIn,
        updateProfile,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        auth
    }
    
    return(
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}