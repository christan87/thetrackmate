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
import axios from 'axios'
import demoTickets from '../../services/demoTickets';
// import demoProjects from '../../services/demoProjects';
import { useUserData } from "../../contexts/UserDataContext";


export default function UpdateProject(){

    const { id } = useParams(); 
    const nameRef = useRef();
    const assignedRef = useRef();
    const priorityRef = useRef();
    const statusRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [currentProject, setCurrentProject] = useState();
    const [privacy, setPrivacy] = useState(true);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const priorities = ["Low", "Medium", "High"];
    const status = ["Open", "In Progress...", "Closed"]
    const { userData } = useUserData();
    const history = useHistory();
    
    function handleChange(){
        setPrivacy(!privacy)
    }
    
    //demo
    useEffect(()=>{
        const project = userData.projectsAll.find((project)=> project._id === id)
        setCurrentProject(project)
        setPrivacy(project.private)
        console.log("currentProject: ", currentProject)
    },[]);
    //This needs to be updated to update the ticket
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)

        let updatedProject = currentProject;

        updatedProject.name = nameRef.current.value;
        updatedProject.priority = priorityRef.current.value;
        updatedProject.status = statusRef.current.value;
        updatedProject.description = descriptionRef.current.value;
        updatedProject.private = privacy;

    
        if(updatedProject.name === ""){
            return setError("Must Complete Form...");
        }
        // if(updatedTicket.assignedTo === "0"){
        //     updatedTicket.assignedTo = ""
        //     return setError("Must Complete Form...");
        // }else{
        //     updatedTicket.assignedTo = users[updatedTicket.assignedTo-1]
        // }
        if(updatedProject.status === "0"){
            return setError("Must Complete Form...");
        }
        if(updatedProject.priorityLevel === "0"){
            updatedProject.priorityLevel = ""
            return setError("Must Complete Form...");
        }
        if(updatedProject.description === ""){
            return setError("Must Complete Form...");
        }
    
        // try{
        //     axios.put(`http://localhost:5000/tickets/update/${id}`, updatedTicket).then(
        //         res=> {
        //             history(`/show-ticket/${res.data}`)
        //         }
        //     )
        // }catch(err){
        //     console.log("Ticket Not Updated: ", err)
        // }
        try{
            await axios.put(`http://localhost:5000/projects/update/${id}`, updatedProject).then(async(response)=>{
                history(`/project/${response.data}`)
            }).catch((error)=>{
                console.log("Project Not Updated: ", error)
            })
        }catch(error){
            console.log("UpdateProject>handleSubmit: ", error)
        }
        setLoading(false)
        setError("")
    }
    // console.log("Users: ", userData.usersAll)
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
                                    <FloatingLabel controlId="floatingNameField" label="Project Name" className="mb-3">
                                        {!currentProject?
                                            <Form.Control 
                                                type="text" 
                                                ref={nameRef} 
                                            />
                                            :
                                            <Form.Control 
                                                type="text" 
                                                defaultValue={currentProject.name}
                                                ref={nameRef} 
                                            />
                                        }
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingUserAssignment" label="Assign to..." className="mb-3">
                                        {!currentProject?
                                            <Form.Select aria-label="User Assignment Select" ref={assignedRef} >
                                                <option value="0"></option>
                                                {userData.usersAll.map((user, index)=>{
                                                    return <option value={index+1} key={`${user.userName}${index}`}>{user.userName}</option>
                                                })}
                                            </Form.Select>
                                            :
                                            <Form.Select aria-label="User Assignment Select" ref={assignedRef} >
                                                <option value="0"></option>
                                                {userData.usersAll.map((user, index)=>{
                                                    if(user.name === currentProject.collaborators.find(u=> u.name === user.name)){
                                                        return <option value={index+1} key={`${user.name}${index}`} selected>{user.name}</option>
                                                    }else{
                                                        return <option value={index+1} key={`${user.name}${index}`}>{user.name}</option>
                                                    }
                                                })}
                                            </Form.Select>
                                        }
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingStatusLevel" label="Status" className="mb-3">
                                        {!currentProject?
                                            <Form.Select aria-label="Status Select" ref={statusRef}>
                                                <option value="0"></option>
                                                {status.map((status, index)=>{
                                                    return <option value={status} key={`${status}${index}`} >{status}</option>
                                                })}
                                            </Form.Select>
                                            :
                                            <Form.Select aria-label="Status Select" ref={statusRef}>
                                                <option value="0"></option>
                                                {status.map((status, index)=>{
                                                    if(status === currentProject.status){
                                                        return <option value={status} key={`${status}${index}`} selected >{status}</option>
                                                    }else{
                                                        return <option value={status} key={`${status}${index}`} >{status}</option>
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
                                    <FloatingLabel controlId="floatingNameField" label="Project Description" className="mb-3">
                                        {!currentProject?
                                            <Form.Control 
                                                type="text" 
                                                ref={descriptionRef} 
                                            />
                                            :
                                            <Form.Control 
                                                type="text" 
                                                defaultValue={currentProject.description}
                                                ref={descriptionRef} 
                                            />
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