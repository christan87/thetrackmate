import React, { useRef, useState, useEffect } from "react";
import { 
    Card,
    Form,
    Button, 
    Alert,
    FloatingLabel,
    Container
} from 'react-bootstrap'
import { Link, useNavigate as useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import demoProjects from '../../services/demoProjects';
import demoUsers from '../../services/demoUsers';
import { useUserData } from "../../contexts/UserDataContext";
import axios from "axios";

export default function Reply(props){
    const subjectRef = useRef();
    const messageRef = useRef();
    const { currentUser } = useAuth();
    const { demoUser } = useDemoAuth();
    const { userData } = useUserData();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        setError("");

        if(userData.mode === "live"){
            let newMessage = {
                type: "reply",
                subject: subjectRef.current.value,
                text: messageRef.current.value,
                author: userData.foundUser._id,
                read: false
            }
    
            try{
                newMessage.recipient = props.replyId;
            }catch(error){
                console.log("NewMessage.js>newMessage.recipient> ", error)
            }
    
            if(subjectRef.current.value === ""){
                return setError("Fill in all fields...")
            }else if(messageRef.current.value === ""){
                return setError("Fill in all fields...")
            }
            console.log("replyMessage: ", newMessage)
    
            await axios.post(`http://localhost:80/messages/reply/${newMessage.recipient}`, newMessage).then((response)=>{
                console.log(response.data)
            }).catch((error)=>{
                console.log("NewMessage.js>handleSubmit>axios.post> ", error)
            })
        }else if(userData.mode === "demo"){
            let newMessage = {
                type: "reply",
                subject: subjectRef.current.value,
                text: messageRef.current.value,
                author: userData.id,
                read: false
            }
    
            try{
                newMessage.recipient = props.replyId;
            }catch(error){
                console.log("NewMessage.js>newMessage.recipient> ", error)
            }
    
            if(subjectRef.current.value === ""){
                return setError("Fill in all fields...")
            }else if(messageRef.current.value === ""){
                return setError("Fill in all fields...")
            }
            console.log("replyMessage: ", newMessage)
        }

        if(props.onHide){
            props.onHide()
        }
        setLoading(false)
        //history("/")    
    }

    return(
        <>
            <Container>
                <div
                    className="d-flex mt-5 justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "700px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Reply</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingNameField" label="Subject" className="mb-3">
                                        <Form.Control type="text" placeholder="Leave Subjecte Here" ref={subjectRef} />
                                    </FloatingLabel>                   
                                    <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                                        <Form.Control as="textarea" placeholder="Write Ticket Description here" ref={messageRef} style={{minHeight: "20rem"}} />
                                    </FloatingLabel>
                                    <Button disabledd={loading} type="submit" className="w-100">Send Message</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <Link to="/">Cancel</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}