import React, { useRef, useState, useEffect } from "react";
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
// import demoTickets from '../../services/demoTickets';
// import demoUsers from '../../services/demoUsers';
import { useUserData } from "../../contexts/UserDataContext";
import axios from "axios";
const backend = process.env.REACT_APP_API;

export default function UpdateTicket(){
    
    const { id } = useParams(); 
    const { userData } = useUserData();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const assignedRef = useRef();
    const statusRef = useRef();
    const priorityRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [currentTicket, setCurrentTicket] = useState();
    const [privacy, setPrivacy] = useState(true);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const status = ["Open", "In Progress...", "Closed"]
    const priorities = ["Low", "Medium", "High"];
    const history = useHistory();

    function handleChange(){
        setPrivacy(!privacy)
    }
    
    //demo
    let ticket = {}
    useEffect(()=>{
        ticket = userData.ticketsAll.find((ticket)=> ticket._id === String(id))
        setPrivacy(ticket.private)
        console.log("Ticket: ", ticket)
        setCurrentTicket(ticket)
        console.log("currentTicket: ", currentTicket)
    },[]);
    //This needs to be updated to update the ticket
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)

        let updatedTicket = currentTicket;
        updatedTicket.name = nameRef.current.value;
        updatedTicket.description = descriptionRef.current.value;
        // updatedTicket.assignedTo = assignedRef.current.value;
        updatedTicket.status = statusRef.current.value;
        updatedTicket.priority = priorityRef.current.value;
        // updatedTicket.admin = currentUser.mongoId;
        updatedTicket.private = privacy; 
        // let updatedTicket = {
        //     name: nameRef.current.value,
        //     assignedTo: assignedRef.current.value,
        //     priorityLevel: priorityRef.current.value,
        //     admin: currentUser.mongoId,
        //     private: privacy 
        // }

        if(updatedTicket.ticketName === ""){
            return setError("Must Complete Form...");
        }
        if(updatedTicket.status === "" || 0){
            return setError("Must Complete Form...");
        }
        // if(updatedTicket.assignedTo === "0"){
        //     updatedTicket.assignedTo = ""
        //     return setError("Must Complete Form...");
        // }else{
        //     updatedTicket.assignedTo = users[updatedTicket.assignedTo-1]
        // }
        if(updatedTicket.priorityLevel === "0"){
            updatedTicket.priorityLevel = ""
            return setError("Must Complete Form...");
        }
        //return console.log("Update:", updatedTicket)
        try{
            axios.put(`${backend}/tickets/update/${id}`, updatedTicket).then(
                res=> {
                    //history(`/ticket/${res.data}`)
                    window.location.href = `/ticket/${id}`;
                }
            )
        }catch(err){
            console.log("Ticket Not Updated: ", err)
        }

        setLoading(false)
    }

    // useEffect(async ()=>{
    //     try{
    //         await axios.get("http://localhost:5000/users/test").then(
    //             res=>{
    //                 setUsers(res.data)
    //             }
    //         )
    //     }catch(err){
    //         console.log("User Fetch Error: ", err)
    //     }
        
    //     try{
    //         axios.get(`http://localhost:5000/tickets/${id}`).then(
    //             res=>{
    //                 if(res.data === null){
    //                     history("/")
    //                 }
    //                 setCurrentTicket(res.data)
    //                 setPrivacy(res.data.private)
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
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Update Ticket</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingNameField" label="Ticket Name" className="mb-3">
                                        {!currentTicket?
                                            <Form.Control 
                                                type="text" 
                                                ref={nameRef} 
                                            />
                                            :
                                            <Form.Control 
                                                type="text" 
                                                defaultValue={currentTicket.name}
                                                ref={nameRef} 
                                            />
                                        }
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingNameField" label="Ticket Description" className="mb-3">
                                        {!currentTicket?
                                            <Form.Control 
                                                type="text" 
                                                ref={descriptionRef} 
                                            />
                                            :
                                            <Form.Control 
                                                type="text" 
                                                defaultValue={currentTicket.description}
                                                ref={descriptionRef} 
                                            />
                                        }
                                    </FloatingLabel>
                                    {/* <FloatingLabel controlId="floatingUserAssignment" label="Assign to..." className="mb-3">
                                        {!currentTicket?
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
                                                    if(user.userName === currentTicket.assigned.userName){
                                                        return <option value={index+1} key={`${user.userName}${index}`} selected>{user.userName}</option>
                                                    }else{
                                                        return <option value={index+1} key={`${user.userName}${index}`}>{user.userName}</option>
                                                    }
                                                })}
                                            </Form.Select>
                                        }
                                    </FloatingLabel> */}
                                    <FloatingLabel controlId="floatingStatusLevel" label="Status" className="mb-3">
                                        {!currentTicket?
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
                                                    if(status === currentTicket.status){
                                                        return <option value={status} key={`${status}${index}`} selected >{status}</option>
                                                    }else{
                                                        return <option value={status} key={`${status}${index}`} >{status}</option>
                                                    }
                                                })}
                                            </Form.Select>
                                        }
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPriorityLevel" label="Priority Level" className="mb-3">
                                        {!currentTicket?
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
                                                    if(priority === currentTicket.priority){
                                                        return <option value={priority} key={`${priority}${index}`} selected >{priority}</option>
                                                    }else{
                                                        return <option value={priority} key={`${priority}${index}`} >{priority}</option>
                                                    }
                                                })}
                                            </Form.Select>
                                        }
                                    </FloatingLabel>
                                    <Form.Group controlId="floatingPrivate" className="mb-3">
                                        {!currentTicket?
                                            <Form.Check type="checkbox" label="Private"/>
                                            :
                                            <Form.Check checked={privacy} onClick={handleChange} type="checkbox" label="Private"/>
                                        }
                                    </Form.Group>
                                    <Button disabledd={loading} type="submit" className="w-100">Update Ticket</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <Link to={`/ticket/${id}`}>Cancel</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}