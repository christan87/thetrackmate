import React, { useRef, useState } from "react";
import { 
    Card,
    Form,
    Button, 
    Alert,
    Container
} from 'react-bootstrap'
import { Link, useNavigate as useHistory, Navigate as Redirect } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
// import Navbar from "../../components/Navbar"

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, googleSignIn, fbSignIn, currentUser } = useAuth();
    const { demoMode, demoLogout } = useDemoAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(demoMode){
                demoLogout()
            }
            setError("");
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            /*
            causes page to refresh which triggers the AuthLoader 
            and redirects to the dashboard from the card body
            */
            window.location.reload(false)
        } catch{
            setError("Failed to Sign In");            
        }
        setLoading(false)
    }

    async function handleGoogleLogin(){
        try {
            if(demoMode){
                demoLogout()
            }
            await googleSignIn()
            /*
            causes page to refresh which triggers the AuthLoader 
            and redirects to the dashboard from the card body
            */
            window.location.reload(false)
        } catch(e) {
            console.log("Login.js>handleGoogleLogin>Error: ", e.message);
        }
    }

    async function handleFacebookLogin(){
        try {
            if(demoMode){
                demoLogout()
            }
            await fbSignIn()
            /*
            causes page to refresh which triggers the AuthLoader 
            and redirects to the dashboard from the card body
            */
            window.location.reload(false)
        } catch(e) {
            console.log("Login.js>handleFacebookLogin>Error: ", e.message);;
        }
    }

    return(
        <>
            <Container>
                {/* <Navbar /> */}
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Log In</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {currentUser && <Redirect to="/" />}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" ref={passwordRef} required />
                                    </Form.Group>
                                    <Button disabled={loading} type="submit" className="w-100 mt-3">Log In</Button>
                                    <Button onClick={handleGoogleLogin} className="w-100">Google Log In</Button>
                                    <Button onClick={handleFacebookLogin} className="w-100">Facebook Log In</Button>
                                </Form>
                                <div className="w-100 text-center mt-3">
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                    <Link className="ms-1" to="/signup">Sign Up</Link>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Would you like to demo the app? <Link to="/demo">Demo App</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}