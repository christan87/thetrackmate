import React from 'react';
import { 
    Card, 
    Container,
    Row,
    Col,
    Button 
} from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import demoProjects from '../../services/demoProjects';
import demoUsers from '../../services/demoUsers';
import demoTickets from '../../services/demoTickets'
import demoProjectComments from '../../services/demoProjectComments';
import Tickets from '../dashboard/Tickets2'
import { Link, useNavigate as useHistory, useParams } from 'react-router-dom';
import { useUserData } from "../../contexts/UserDataContext";
import bannerImg from '../../assets/scrum-board-concept-illustration.png';

export default function Project(){

    const history = useHistory();
    const { userData } = useUserData();

    function handleClick(){
        history(`/project/update/${id}`)
    }

    function findProject(id){
        return userData.projectsAll.find(project => project._id === id)
    }

    const {id} = useParams();
    const project = findProject(id);
    let projectTickets = [];
    if(userData.mode === "demo"){
        projectTickets = userData.ticketsAll.filter((ticket)=>{
            return project.tickets.includes(ticket._id)
        });
    }else{
        projectTickets = project.tickets 
    }

    const projectComments = userData.projectCommentsAll.filter((comment)=>{
        return project.comments.includes(comment.id)
    })


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
            <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title}>Project</h2>
            <div style={{display:"flex", alignItems:"center"}}>
                <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
            </div>
        </div>
            <div className="">
                <Card className="mt-0 w-100">
                    <Card.Body>
                        <Row>
                            <Col xs={4}>
                                <Card.Title>{project.name}</Card.Title>
                                <Card.Text>description: {project.description}</Card.Text>
                                <Card.Text>status: {project.status}</Card.Text>
                                <Card.Text>priority: {project.priority}</Card.Text>
                                <Card.Text>{project.private? <>Set to: Private</> : <>Set to: Public</>}</Card.Text>
                            </Col>
                            <Col xs={8}>
                                {console.log("Comments: ", projectComments)}
                                {projectComments.map((comment)=>{
                                    return(
                                        <div key={comment.id}>
                                            <p className="mb-0">
                                                <strong>{`${comment.author.name}: `}</strong>
                                                {comment.text}
                                            </p>
                                            <p>{comment.date}</p>
                                        </div>
                                    )
                                })}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Button className="my-3" onClick={handleClick}>Update Project</Button>
            </div>
            <Tickets tickets={projectTickets} moreDetails={true} />
        </div>
    )
}