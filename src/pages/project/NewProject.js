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
import { useUserData } from "../../contexts/UserDataContext";
//import axios from "axios";
// import demoUsers from '../../services/demoUsers';

export default function NewProject(props){

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { userData } = useUserData();
    const nameRef = useRef();
    const assignedRef = useRef();
    const priorityRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        setError("");

        

        if(props.onHide){
            props.onHide()
        }
        setLoading(false)
    }

    return(
        <>
            <Container>
                <div
                    className="d-flex mt-5 justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Add New Project</h2>
                                {error?? <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingNameField" label="Project Name" className="mb-3">
                                        <Form.Control type="text" placeholder="Leave Project Name Here" ref={nameRef} />
                                    </FloatingLabel>   
                                    <FloatingLabel controlId="floatingUserAssignment" label="Assign to..." className="mb-3">
                                        <Form.Select aria-label="User Assignment Select" ref={assignedRef} >
                                            <option value="0"></option>
                                            {userData.usersAll&& userData.usersAll.map((user, index)=>{
                                                return <option value={index+1} key={`${user.name}${index}`}>{user.name}</option>
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPriorityLevel" label="Priority Level" className="mb-3">
                                        <Form.Select aria-label="Priority Level Select" ref={priorityRef}>
                                            <option value="0"></option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                                        <Form.Control as="textarea" placeholder="Write Ticket Description here" ref={descriptionRef} />
                                    </FloatingLabel>
                                    <Button disabled={loading} type="submit" className="w-100">Add Ticket</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    )
}