import React, {useEffect, Component} from 'react'
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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Tickets from '../dashboard/Tickets2';
import projectCoverImage001 from '../../assets/project-cover-img-001.png';
import { CompassCalibrationOutlined } from '@material-ui/icons';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 350,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}))(Tooltip);

function ProjectCard(props){
    let projectIMG = props.project.img || projectCoverImage001;
    console.log("Project: ", props.project)
    const cardStyle = {
        // width: '15.625rem', //250px
        // height: '12.5rem', //200px
        width: '12.5rem', //200px
        height: '9.375rem', //150px
        borderRadius: "8px",
        overflow: "hidden",
        img: {
            // width: '15.625rem', //140px 8.75rem
            // height: '15.625rem', //140px 8.75rem
            width: '12.5rem', //200px
            height: '12.5rem', //200px
            paddingBottom: "1rem"
        },
        /* vertical shadow */
        boxShadow: "4px 0px 16px rgba(0, 0, 0, 0.08)",
    }

    const propStyles ={
        width: "fit-content",
        marginRight: "1.719rem", //27.5px
    }

    let projectTextStyle = {
        display: 'block',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        textDecoration: 'none', 
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }

    return(
        //<div style={{width: "fit-content", marginRight: "1.5rem", marginLeft: "1.5rem"}}>
        <div style={propStyles}>
            <Card style={cardStyle}>
            <div style={{backgroundColor: "#FB5833", height: "8.75rem", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                <Card.Img style={cardStyle.img} variant="top" src={projectIMG} alt="Project Cover Image" />
            </div>
            <Card.Body>
                {props.project._id? 
                    <Card.Title> 
                        <HtmlTooltip style={{maxWidth:'180px'}} title={
                            <React.Fragment>
                            <Typography color="inherit">{props.project.name}</Typography>
                            <b>Description: </b>{`${props.project.description}`}
                            </React.Fragment>
                        }>
                            <Link style={projectTextStyle} to={`/project/${props.project._id}`}>{`${props.project.name}`}</Link>
                        </HtmlTooltip>
                    </Card.Title>
                    :
                    <Card.Title style={projectTextStyle} >{props.project.name}</Card.Title>
                }
                
                {/* <Card.Text>
                Description: Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text> */}
            </Card.Body>
            </Card>
        </div>
    )
}

export default function AltUser(){

    const { AltUserId } = useParams()
    const { userData } = useUserData();
    const user = userData.usersAll.find((user)=> user._id == AltUserId)
    

    //const projects = userData.projectsAll;

    const projects = userData.projectsAll.filter(project=> project.admin === AltUserId);

    // const projects = userData.projectsAll.filter((project)=>{
    //     const found = project.collaborators.filter((user)=> user._id == id);
    //     if(found.length > 0){
    //         return project
    //     }
    // })

    // const tickets = userData.tickets;
    async function getTickets(){
        let tickets = [];
        let url = `http://localhost:80/tickets/user/${AltUserId}`
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false)
            xhr.onload = ()=>{
                tickets = JSON.parse(xhr.responseText).tickets;
            }

            xhr.send()
        } catch (error) {
            console.log('user>AltUser2.js>getTickets: ', error)
        }
        return tickets;
    }
    let tickets = userData.ticketsAll.filter(ticket=> ticket.admin === AltUserId);
    
    // const tickets = userData.ticketsAll.filter((ticket)=>{
    //     const found = ticket.assigned.filter((user)=> user._id == id);
    //     if(found.length > 0){
    //         return ticket
    //     }
    // })


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
                <Card style={{height: "80vh"}}>
                    <Card.Body>
                        <Card.Text>Email: {user.email}</Card.Text>
                        <Card.Text>Set To: {user.private==true? "Private" : "Public"}</Card.Text>
                        <Card.Text>
                            {/* Projects: {projects.map((project=><Card.Text><Link to={`/project/${project._id}`}>{project.name}</Link></Card.Text>))} */}
                            Projects: 
                            <div style={{display: 'flex'}}>
                                {projects.map((project=><ProjectCard project={project} / >))}
                            </div>
                        </Card.Text> 
                        <Card.Text>
                            {tickets.length > 0 ? 
                                <Tickets tickets={tickets}/> 
                                : 
                                <h3><strong>No Tickets Added</strong></h3> 
                            }
                            {/* Tickets: {tickets.map((ticket=><Card.Text><Link to={`/ticket/${ticket._id}`}>{ticket.name}</Link></Card.Text>))} */}
                        </Card.Text> 

                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}