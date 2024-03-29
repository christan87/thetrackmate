import React, {useState} from 'react';
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
import { useDemoAuth } from '../../contexts/AuthDemoContext';
import bannerImg from '../../assets/scrum-board-concept-illustration.png';
import UserList2 from '../../components/UserList2';
import axios from 'axios';
import useLocalStorageState from '../../hooks/useLocalStorageState';
const backend = process.env.REACT_APP_API;

export default function Project(){

    const history = useHistory();
    const { userData } = useUserData();
    const {id} = useParams();
    let project = findProject(id);
    let projectTickets = [];
    const [addedUsers, setAddedUsers] = useState([]);
    const {updateLocalStorageData, getLocalStorageData, removeLocalStorageData} = useDemoAuth();
    console.log('project: ', project)
    console.log('userData: ', userData)

    
    function handleClick(){
        history(`/project/update/${id}`)
    }

    function findProject(id){
        return userData.projectsAll.find(project => project._id === id)
    }

    async function handleAdd(newUsers){
        if(userData.mode === 'live'){
            let updatedUsers = [...project.collaborators, ...newUsers]
            project.collaborators = updatedUsers;
            try{
                await axios.put(`${backend}/projects/update/${id}`, project).then((response)=>{
                    console.log("response: ", response.data)
                    setAddedUsers(updatedUsers);
                }).catch((err)=>{
                    console.log("Project2.js>handleAdd>error: ", err)
                })
            }catch(err){
                console.log("Project2.js>handleAdd>error: ", err)
            }
        }else{

        }

    }

    async function handleDelete(){
        if(userData.mode === 'live'){
            try{
                await axios.delete(`${backend}/projects/delete/${id}`).then((response)=>{
                    console.log("response: ", response.data)
                    window.location.href = '/';
                }).catch((err)=>{
                    console.log("Project2.js>handleDelete>error: ", err)
                })
            }catch(err){
                console.log("Project2.js>handleDelete>error: ", err)
            }
        }else{
            let localStorageData = getLocalStorageData();
            let updatedProjects = localStorageData.projectsAll.filter(element => element._id !== id)
            localStorageData.projectsAll = updatedProjects;
            updateLocalStorageData(localStorageData);
            window.location.href = '/';
        }   
    } 


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
                            {/* <Col xs={8}> */}
                            <Col xs={4}>
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
                            <Col xs={4}>
                                <UserList2 projectId={id} currCollaborators={project.collaborators} handleAddUsers={handleAdd}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <div>
                    
                    {project.admin === userData.foundUser._id?
                        <div>
                            <Button className="my-3" onClick={handleClick}>Update Project</Button>
                            <Button className='btn btn-danger' style={{marginLeft: '.5rem'}} onClick={handleDelete}>Delete</Button>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
            <Tickets tickets={projectTickets} moreDetails={true} />
        </div>
    )
}