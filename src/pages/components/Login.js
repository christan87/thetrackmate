import React, { useRef, useState } from "react";
import { 
    Card,
    Form,
    Button, 
    Alert,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { Link, useNavigate as useHistory, Navigate as Redirect } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import '../../styles/components/Login.css'
import logo from '../../assets/LogoDesignColor.png';
import googleLogo from '../../assets/googleLogo.png'
import fbLogo from '../../assets/fbLogo.png'
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
        <div className="login-body">
            <Container className="d-flex flex-row justify-content-end">
                {/* <Navbar /> */}
                <Row>
                <Col lg={3} md={6} sm={12}>
                <img className="login-blurb-logo" src={logo} alt="Track Mate Logo" />
                </Col>

                <Col lg={5} md={6} sm={12}>
                <div className="d-flex flex-column login-blurb">
                    <h1 className="font-weight-bolder login-blurb-title">Track Mate</h1>
                    <h3 className="login-blurb-text">The solution to effective</h3>
                    <h3 className="login-blurb-text">team problem solving</h3>
                </div>
                </Col>

                <Col lg={4} md={6} sm={12}>
                <div
                    className="d-flex align-items-center login-form"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card className="login-form-input">
                            <Card.Body>
                                <h2 className="text-center mb-4">Log In</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {currentUser && <Redirect to="/" />}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className="login-form-input" type="email" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className="login-form-input" type="password" ref={passwordRef} required />
                                    </Form.Group>

                                    <div className="d-flex flex-row login-form-btn">
                                        <div/>
                                        <Button disabled={loading} type="submit">Log In</Button>
                                    </div>
                                    
                                    <div className="d-flex flex-row login-form-btn">
                                    <img  src={googleLogo} alt="Google Logo" />
                                        <Button onClick={handleGoogleLogin}>Google Log In</Button>
                                    </div>
                                    
                                    <div className="d-flex flex-row login-form-btn">
                                    <img  src={fbLogo} alt="Facebook Logo" />
                                        <Button onClick={handleFacebookLogin}>Facebook Log In</Button>
                                    </div>
                                    
                                    
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
                </Col>
                </Row>
            </Container>
        </div>
    )
}