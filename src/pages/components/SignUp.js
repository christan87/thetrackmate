import React, {useState, useRef} from "react";
import { Link, useNavigate as useHistory} from 'react-router-dom';
import { 
    Card,
    Form,
    Button, 
    Alert,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { useAuth } from "../../contexts/AuthFirebaseContext";
import '../../styles/components/SignUp.css'
import bgImage from '../../assets/LogoDesignColor.png'

export default function Signup(){

    // =====State Begin=====
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    // =====State End=====
    
    // =====Variable Declaration Begin=====
    const {createUserWithEmailAndPassword, auth, updateProfile} = useAuth()
    const history = useHistory();
    // =====Variable Declaration Begin=====

    // =====Input Refferences Begin=====
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const emailRef = useRef('')
    const urlRef = useRef('')
    const passwordRef = useRef('')
    const confirmPasswordRef = useRef('')
    // =====Input Refferences End=====

    // =====Funcitons Begin===== 
    async function handleSubmit(e){
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(async (response)=>{
                await updateProfile(auth.currentUser, {displayName: `${firstNameRef.current.value} ${lastNameRef.current.value}`, photoURL: urlRef.current.value}).then((response)=>{
                    console.log(response)
                    window.location.href = '/';
                }).catch(error=>{
                    console.log("Signup.js>handleSubmit>updateProfile: ", error)
                })
            }).catch(error=>{
                let toWeak = "Firebase: Password should be at least 6 characters (auth/weak-password).";
                let emailExitst= "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
                if(error.message === toWeak){
                    setPasswordError("Password should be at least 6 characters");
                }else if(error.message === emailExitst){
                    setEmailError("The email address is already in use by another account.");
                }else{
                    console.log("SignUp.js>signup: ", error)
                }
            })
        } catch (error) {
                console.log("SignUp.js>handleSubmit: ", error)
        }

        //history(-1)
    }

    /* 
        togglePW accepts an id and uses it to target the specified form input 'specifically' a password
        and toggles its type between text and password so that the user can check what they've written
    */
    function togglePW(id){
        const password = document.getElementById(id);
        if(password.type === 'password'){
            password.type = 'text';
        }else{
            password.type = 'password'
        }
    }

    /*
        This function detects changes in the confirm password input and compares the value to the password
        input. If the values aare not equal then it sets the password error
    */
    function handleOnChangeCheck(){
        if(confirmPasswordRef.current.value !== ''){
            if(confirmPasswordRef.current.value !== passwordRef.current.value){
                if(passwordError === '') setPasswordError('Passwords Do Not Match!');
                disableSubmit();
            }else{
                setPasswordError('');
                enableSubmit()
            }
        }else{
            setPasswordError('');
            enableSubmit()
        }
    }

    /*
        disableSubmit() disables the submit button by adding the disable attribute to the button
    */ 
    function disableSubmit(){
        const button = document.getElementById("submit-btn");
        if(!button.hasAttribute('disabled')){
            button.setAttribute('disabled', '');
        }
    }

    /*
        enableSubmit() enables the submit button by removind the disable attribute from the button
    */ 
    function enableSubmit(){
        const button = document.getElementById("submit-btn");
        if(button.hasAttribute('disabled')){
            button.removeAttribute('disabled');
        }
    }    
    // =====Funcitons End===== 

    // =====Inline Styles Start===== 
    const styles = {
        signupRoot:{
            height: '100vh',
            width: '100vw',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
        },
        signupBody:{
            maxHeight: '75%', 
            padding: '12px', 
            margin: '0',
        },
        rowStyle:{
            minWidth: '470px',
            zIndex: '1'
        }
    }
    // =====Inline Styles end===== 

    return(
        <div className="signup-root" style={styles.signupRoot}>
            <div>
                <img className='signup-img' src={bgImage} />
            </div>
            <Row style={styles.rowStyle}>
                <Container className="signup-body" style={styles.signupBody}>
                    <Form className="signup-form" onSubmit={handleSubmit}>
                        <h3>Sign-Up</h3>
                        <Form.Group className="signup-form-group" id="firstNameGroup">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} placeholder="First Name..." required />
                        </Form.Group>
                        <Form.Group className="signup-form-group" id="lasttNameGroup">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} placeholder="Last Name..." required />
                        </Form.Group>
                        <Form.Group className="signup-form-group" id="emailGroup">
                            <Form.Label>Email</Form.Label>
                            {emailError !== ''? <p className="signup-email-error">{emailError}</p> : <></>}
                            <Form.Control type="email" ref={emailRef} placeholder="jdoe@gmail.com..." required />
                        </Form.Group>
                        <Form.Group className="signup-form-group" id="urlGroup">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="url" ref={urlRef} placeholder="https://example.com" />
                        </Form.Group>
                        <Form.Group className="signup-form-group" id="passwordGroup">
                            <Form.Label>Password</Form.Label>
                            <div className="signup-pw-input-toggle">
                                <Form.Control id="password" ref={passwordRef}  type="password" required />
                                <Button className="signup-btn-pw-input-toggle" onClick={()=>togglePW("password")}>Show</Button>
                            </div>
                        </Form.Group>
                        <Form.Group className="signup-form-group" id="confirmPasswordGroup">
                            <Form.Label>Confirm Password</Form.Label>
                            {passwordError !== ''? <p className="signup-password-error">{passwordError}</p> : <></>}
                            <div className="signup-pw-input-toggle">
                                <Form.Control id="confirmPassword" ref={confirmPasswordRef} type="password" onChange={handleOnChangeCheck} required />
                                <Button className="signup-btn-pw-input-toggle" onClick={()=>togglePW("confirmPassword")}>Show</Button>
                            </div>
                        </Form.Group>
                        <Button className="btn signup-btn-submit" id="submit-btn" type="submit">Submit form</Button>
                    </Form>
                </Container>
            </Row>
        </div>
    );
}