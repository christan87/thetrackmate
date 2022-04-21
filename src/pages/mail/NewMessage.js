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

export default function NewMessage(props){
    const subjectRef = useRef();
    const usertRef = useRef();
    const messageRef = useRef();
    const { currentUser } = useAuth();
    const { demoUser } = useDemoAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        setError("");

        let newMessage = {
            type: "message",
            subject: subjectRef.current.value,
            text: messageRef.current.value,
            author: {
                name: demoUser.userName,
                id:demoUser._id
            },
            date: "02/10/22",
            id: "654693175",
            recipientId: props.recipientId,
            read: false
        }
        console.log("newMessage: ", newMessage)

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
                                <h2 className="text-center mb-4">New Message</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingNameField" label="Subject" className="mb-3">
                                        <Form.Control type="text" placeholder="Leave Subjecte Here" ref={subjectRef} />
                                    </FloatingLabel>     
                                    <FloatingLabel controlId="floatingNameField" label="to" className="mb-3">
                                        <Form.Control type="text" placeholder="enter username" ref={usertRef} />
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