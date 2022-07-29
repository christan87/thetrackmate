import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { 
    Card, 
    Container,
    Row,
    Col 
} from 'react-bootstrap';
import demoUsers from '../../services/demoUsers';
import demoProjects from '../../services/demoProjects';
import demoTickets from '../../services/demoTickets';
import { useUserData } from "../../contexts/UserDataContext";

export default function AltUser(){

    const { id } = useParams()
    const { userData } = useUserData();
    const user = userData.usersAll.find((user)=> user._id == id)
    
    const projects = userData.projectsAll.filter((project)=>{
        const found = project.collaborators.filter((user)=> user._id == id);
        if(found.length > 0){
            return project
        }
    })

    const tickets = userData.ticketsAll.filter((ticket)=>{
        const found = ticket.assigned.filter((user)=> user._id == id);
        if(found.length > 0){
            return ticket
        }
    })
    console.log("Tickets: ", tickets)
    const style={
        backgroundColor: "blue", 
        display: "flex",
        padding: "5px"
    }

    return(
        <div className="container">
            <div style={style} > 
                <h4 className="mb-0 ms-5" >{user.name}</h4>
            </div>
            <Container>
                <Card style={{height: "75vh"}}>
                    <Card.Body>
                        <Card.Text>Email: {user.email}</Card.Text>
                        <Card.Text>Set To: {user.private==true? "Private" : "Public"}</Card.Text>
                        <Card.Text>
                            Projects: {projects.map((project=><Card.Text><Link to={`/project/${project._id}`}>{project.name}</Link></Card.Text>))}
                        </Card.Text> 
                        <Card.Text>
                            Tickets: {tickets.map((ticket=><Card.Text><Link to={`/ticket/${ticket._id}`}>{ticket.name}</Link></Card.Text>))}
                        </Card.Text> 
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}