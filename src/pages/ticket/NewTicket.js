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
//import axios from "axios";
import demoProjects from '../../services/demoProjects';
import demoUsers from '../../services/demoUsers';

export default function NewTicket(props){
    const nameRef = useRef();
    const typeRef = useRef();
    const assignedProjectRef = useRef();
    const assignedRef = useRef();
    const priorityRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    const { demoUser } = useDemoAuth();
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const [assignedProject, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        setError("");

        let newTicket = {
            name: nameRef.current.value,
            id: demoUser._id,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
            priority: priorityRef.current.value,
            status: "Open",
            assignedDevs:[],
            comments:[],
            date: "01/12/22",
            private: true,
            project:{
                id: demoProjects[assignedProjectRef.current.value - 1].id,
                name: demoProjects[assignedProjectRef.current.value - 1].projectName
            } 
        }
        console.log("Ticket: ", newTicket)
        // let newTicket = {
        //     name: nameRef.current.value,
        //     assignedTo: assignedRef.current.value,
        //     priorityLevel: priorityRef.current.value,
        //     admin: currentUser.mongoId 
        // }

        // if(newTicket.ticketName === ""){
        //     return setError("Must Complete Form...");
        // }
        // if(newTicket.assignedTo === "0"){
        //     newTicket.assignedTo = ""
        //     return setError("Must Complete Form...");
        // }else{
        //     newTicket.assignedTo = users[newTicket.assignedTo-1]
        // }
        // if(newTicket.priorityLevel === "0"){
        //     newTicket.priorityLevel = ""
        //     return setError("Must Complete Form...");
        // }
        // try{
        //     axios.post('http://localhost:5000/tickets/add', newTicket).then(
        //         res=> {
        //             console.log("Ticket Added!: ", res.data)
        //             history(`/show-ticket/${res.data}`)
        //         }
        //     )
        // }catch(err){
        //     console.log("Ticket Not Added: ", err)
        // }
        if(props.onHide){
            props.onHide()
        }
        setLoading(false)
        //history("/")    
    }

    // useEffect(()=>{
    //     try{
    //         axios.get("http://localhost:5000/users/test").then(
    //             res=>{
    //                 setUsers(res.data)
    //             }
    //         )
    //     }catch(err){
    //         console.log("User Fetch Error: ", err)
    //     }
    // },[])

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
                                <h2 className="text-center mb-4">Add New Ticket</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingNameField" label="Ticket Name" className="mb-3">
                                        <Form.Control type="text" placeholder="Leave Ticket Name Here" ref={nameRef} />
                                    </FloatingLabel>                   
                                    <FloatingLabel controlId="floatingUserAssignment" label="Ticket Type" className="mb-3">
                                        <Form.Select aria-label="Ticket Type Select" ref={typeRef} >
                                            <option value="0"></option>
                                            <option value="Bug">Bug</option>
                                            <option value="Goal">Goal</option>
                                            <option value="Feature Request">Feature Request</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingUserAssignment" label="Assign to Project.." className="mb-3">
                                        <Form.Select aria-label="Project Assignment Select" ref={assignedProjectRef} >
                                            <option value="0"></option>
                                            {demoProjects.map((project, index)=>{
                                                return <option value={index+1} key={`${project.projectName}${index}`}>{project.projectName}</option>
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingUserAssignment" label="Assign to..." className="mb-3">
                                        <Form.Select aria-label="User Assignment Select" ref={assignedRef} >
                                            <option value="0"></option>
                                            {demoUsers.map((user, index)=>{
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
                                    <Button disabledd={loading} type="submit" className="w-100">Add Ticket</Button>
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