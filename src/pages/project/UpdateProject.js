import React, { useRef, useState, useEffect } from 'react';
import { 
    Card,
    Form,
    Button, 
    Alert,
    FloatingLabel,
    Container
} from 'react-bootstrap'
import { Link, useNavigate as useHistory, useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import demoTickets from '../../services/demoTickets';
import demoProjects from '../../services/demoProjects';


export default function UpdateProject(){

    const { id } = useParams(); 
    const nameRef = useRef();
    const assignedRef = useRef();
    const priorityRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [currentProject, setCurrentProject] = useState();
    const [privacy, setPrivacy] = useState(true);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const priorities = ["Low", "Medium", "High"];
    const history = useHistory();
    
    function handleChange(){
        setPrivacy(!privacy)
    }
    
    //demo
    useEffect(()=>{
        const project = demoProjects.find((project)=> project.id === id)
        setCurrentProject(project)
        console.log("currentProject: ", currentProject)
    },[]);
    //This needs to be updated to update the ticket
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
    
        let updatedTicket = {
            ticketName: nameRef.current.value,
            assignedTo: assignedRef.current.value,
            priorityLevel: priorityRef.current.value,
            admin: currentUser.mongoId,
            private: privacy 
        }
    
        // if(updatedTicket.ticketName === ""){
        //     return setError("Must Complete Form...");
        // }
        // if(updatedTicket.assignedTo === "0"){
        //     updatedTicket.assignedTo = ""
        //     return setError("Must Complete Form...");
        // }else{
        //     updatedTicket.assignedTo = users[updatedTicket.assignedTo-1]
        // }
        // if(updatedTicket.priorityLevel === "0"){
        //     updatedTicket.priorityLevel = ""
        //     return setError("Must Complete Form...");
        // }
    
        // try{
        //     axios.put(`http://localhost:5000/tickets/update/${id}`, updatedTicket).then(
        //         res=> {
        //             history(`/show-ticket/${res.data}`)
        //         }
        //     )
        // }catch(err){
        //     console.log("Ticket Not Updated: ", err)
        // }
    
        setLoading(false)
    }

    return(
        <>
            <Container>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Update Project</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingNameField" label="Ticket Name" className="mb-3">
                                        {!currentProject?
                                            <Form.Control 
                                                type="text" 
                                                ref={nameRef} 
                                            />
                                            :
                                            <Form.Control 
                                                type="text" 
                                                defaultValue={currentProject.projectName}
                                                ref={nameRef} 
                                            />
                                        }
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingUserAssignment" label="Assign to..." className="mb-3">
                                        {!currentProject?
                                            <Form.Select aria-label="User Assignment Select" ref={assignedRef} >
                                                <option value="0"></option>
                                                {users.map((user, index)=>{
                                                    return <option value={index+1} key={`${user.userName}${index}`}>{user.userName}</option>
                                                })}
                                            </Form.Select>
                                            :
                                            <Form.Select aria-label="User Assignment Select" ref={assignedRef} >
                                                <option value="0"></option>
                                                {users.map((user, index)=>{
                                                    if(user.userName === currentProject.assigned.userName){
                                                        return <option value={index+1} key={`${user.userName}${index}`} selected>{user.userName}</option>
                                                    }else{
                                                        return <option value={index+1} key={`${user.userName}${index}`}>{user.userName}</option>
                                                    }
                                                })}
                                            </Form.Select>
                                        }
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPriorityLevel" label="Priority Level" className="mb-3">
                                        {!currentProject?
                                            <Form.Select aria-label="Priority Level Select" ref={priorityRef}>
                                                <option value="0"></option>
                                                {priorities.map((priority, index)=>{
                                                    return <option value={priority} key={`${priority}${index}`} >{priority}</option>
                                                })}
                                            </Form.Select>
                                            :
                                            <Form.Select aria-label="Priority Level Select" ref={priorityRef}>
                                                <option value="0"></option>
                                                {priorities.map((priority, index)=>{
                                                    if(priority === currentProject.priority){
                                                        return <option value={priority} key={`${priority}${index}`} selected >{priority}</option>
                                                    }else{
                                                        return <option value={priority} key={`${priority}${index}`} >{priority}</option>
                                                    }
                                                })}
                                            </Form.Select>
                                        }
                                    </FloatingLabel>
                                    <Form.Group controlId="floatingPrivate" className="mb-3">
                                        {!currentProject?
                                            <Form.Check type="checkbox" label="Private"/>
                                            :
                                            <Form.Check checked={privacy} onClick={handleChange} type="checkbox" label="Private"/>
                                        }
                                    </Form.Group>
                                    <Button disabledd={loading} type="submit" className="w-100">Update Project</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <Link to={`/project/${id}`}>Cancel</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}