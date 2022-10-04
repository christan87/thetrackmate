import React, {useRef, useState} from "react";
import { Link, useNavigate as useHistory} from 'react-router-dom';
import { 
    Form,
    Button, 
    Container,
    Row,
    Col
} from 'react-bootstrap'
// =====Style Import Begin=====
import '../../styles/components/ForgotPassword.css'
// =====Style Import End=====
// =====================================================
// =====Context Import Begin=====
import {useAuth} from '../../contexts/AuthFirebaseContext'
// =====Context Import End=====
// =====================================================
import bgImage from '../../assets/LogoDesignColor.png';

export default function ForgotPassword(){

    // =====================================================
    // =====Var Assignment Begin=====
    const {auth, sendPasswordResetEmail} = useAuth();
    const [eamilError, setEmailError] = useState('');
    const emailNotFound = 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).';
    const badEmail = 'Firebase: The email address is badly formatted. (auth/invalid-email).';
    // =====Var Assignment End=====
    // =====================================================
    // =====Input Refferences Begin=====
    const emailRef = useRef('');
    // =====Input Refferences End=====
    // =====================================================
    // =====Function Declaration Begin=====

    /*
    This function sends a request to firebase for password reset. It launches an alert which after confirming
    redirects the user to the landing page 
    */
    function handleSubmit(e){
        e.preventDefault()
        sendPasswordResetEmail(auth, emailRef.current.value).then(result=>{
            alert("A link to reset your password has been emailed to you. Check spam folder.")
            window.location.href = '/';
        }).catch(err=>{
            if(err.message === emailNotFound){
                setEmailError("No User with that email address was found.")
            }else if(err.message === badEmail){
                setEmailError("The email address you entered was invalid. Try again.")
            }
            console.log("ForgotPassword.js>handleSubmit>sendPasswordResetEmail: ", err.message.toString());
        })
    }

    // =====Function Declaration End=====
    // =====================================================

    return(
        <div className="forgot-password-root">
            <div>
                <img className='forgot-password--img' src={bgImage} />
            </div>
            <Row className="forgot-password-row" style={{marginTop: '15rem'}}>
                <Container className="forgot-password-body">
                    <Form onSubmit={handleSubmit}>
                        <h3>Forgot Password</h3>
                        <Form.Group id='emailGroup'>
                            <Form.Label>Email</Form.Label>
                            {eamilError !== ''? <p className="forgot-password-email-error">{eamilError}</p> : <></>}
                            <div className="forgot-password-submit">
                                <Form.Control typeof="email" ref={emailRef} placeholder="jdoe@gmail.com" required />
                                <Button className="forgot-password-btn-submit" id="submitButton" type="submit">Submit</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Container>
            </Row>
        </div>
    )
}