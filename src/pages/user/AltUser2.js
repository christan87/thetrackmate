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
import bannerImg from '../../assets/scrum-board-concept-illustration.png';

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

    const bannerStyle = {
        backgroundColor: "#336CFB", 
        display: "flex",
        height: "10.688rem", // 171px
        width: "100%",
        justifyContent: "space-between",
        padding: "0",
        // alignItems: "center",
        // position: "absolute",
        title: {
            color: "#FFFFFF",
            fontWeight: "400"
        },
        img: {
            height: "10.688rem", // 171px
            width: "10.688rem", // 171px
        }
    }


    return(
        <div className="container">
            <div className="container" style={bannerStyle} > 
                <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title}>User: {user.name}</h2>
                <div style={{display:"flex", alignItems:"center"}}>
                    <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
                </div>
            </div>
            <div>
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
            </div>
        </div>
    )
}