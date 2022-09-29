import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Card,
    Container,
    Row,
    Col,
    Button,
    FloatingLabel,
    Alert,
    Form
} from 'react-bootstrap';
import UserList from '../../components/UserList';
// import demoTickets from '../../services/demoTickets';
// import demoTicketComments from '../../services/demoTicketComments';
import {useNavigate as useHistory } from 'react-router-dom';
import { useUserData } from "../../contexts/UserDataContext";
import { useDemoAuth } from '../../contexts/AuthDemoContext';
import bannerImg from '../../assets/scrum-board-concept-illustration.png';
import axios from "axios"
import DeleteIcon from '@material-ui/icons/Delete';

function  Comment(props){
    const { userData } = useUserData();
    const {comment, ticketId} = props;
    const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const date = new Date(comment.createdAt).toLocaleDateString();
    const commentDisplayStyle = {
        borderRadius: "5px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "10px",
        comment:{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "5px",
            backgroundColor: "rgba(66, 135, 245, 0.5)",
            maxWidth: "90%",
            minWidth: "90%",
            padding: "0px 5px 0px"
        },
        altComment:{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "5px",
            backgroundColor: "rgba(52, 238, 173, 0.5)",
            maxWidth: "90%",
            minWidth: "90%",
            padding: "0px 5px 0px"
        },
        avatar:{
            maxWidth:"40px",
            minWidth: "40px",
            maxHeight: "40px",
            minHeight: "40px",
            borderRadius: "50px",
            marginRight: ".5rem"
        },
        date:{
            fontSize:"12px",
            color: "rgba(76, 76, 76, 0.5)"
        },
        delete:{
            color: 'red'
        }
    }
    let commentSwitchStyle;

    if(userData.mode !== 'demo'){
        commentSwitchStyle = comment.author.id === userData.foundUser._id? commentDisplayStyle.comment : commentDisplayStyle.altComment;
    }else{
        commentSwitchStyle = comment.author.id === userData.id? commentDisplayStyle.comment : commentDisplayStyle.altComment;
    }
    
    async function handleDelete(){
        await axios.delete(`http://localhost:80/comments/delete/${ticketId}/${comment._id}`).then((response)=>{
            console.log(response.data)
            window.location.reload(true);
        }).catch((error)=>{
            console.log("Ticket.js>handleDelete: ", error)
        })
    }

    return(
        <div style={{display:"flex", marginBottom:".5rem"}}>
            <div>
                <img src={comment.author.avatar? comment.author.avatar : defaultAvatar} style={commentDisplayStyle.avatar}/>
            </div>
            <div style={{width:"100%"}}>
                <strong>{`${comment.author.name}`}</strong>
                <span style={commentDisplayStyle.date}> - {date === "Invalid Date"? comment.date : date}</span>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div className="" style={commentSwitchStyle}> 
                    <Card.Text className="mb-0">{comment.text}</Card.Text>
                </div>
                    {userData.mode !== 'demo'?
                        comment.author.id === userData.foundUser._id? 
                            <DeleteIcon style={commentDisplayStyle.delete} onClick={handleDelete}/> 
                            : 
                            <></>
                        :
                        comment.author.id === userData.id? 
                            <DeleteIcon style={commentDisplayStyle.delete} onClick={handleDelete}/> 
                            : 
                            <></>
                    }
                </div>
            </div>

        </div>
    )
}

export default function Ticket(){

    const { id } = useParams();
    const { userData } = useUserData();
    const {updateLocalStorageData, getLocalStorageData, removeLocalStorageData} = useDemoAuth(); 

    const ticket = userData.ticketsAll.find(element => element._id === id);
    console.log("ticket: ", ticket)
    let comments = [];
    if(userData.mode === "demo"){
        comments = userData.ticketCommentsAll.filter(element => element.ticketId === String(id));
    }else{
        comments = ticket.comments
    }
    const commentRef = useRef();
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState("");
    const history = useHistory()

    const handleClick = ()=>{
        history(`/ticket/update/${id}`)
    }

    const handleDelete = async ()=>{
        if(userData.mode === 'live'){
            let port = 80;
            try{
                await axios.delete(`http://localhost:${port}/tickets/delete/${id}`).then((response)=>{
                    console.log("response: ", response.data)
                    window.location.href = '/';
                }).catch(err=>{
                    console.log("Ticket2.js>handleDelete>error: ", err)
                })
            }catch(err){

            }
            alert("Delete")
        }else{
            let localStorageData = getLocalStorageData()
            localStorageData.ticketCommentsAll = localStorageData.ticketCommentsAll.filter(element=> element.author.id !== userData.foundUser._id)
            let projects = localStorageData.projectsAll;
            let project = projects.find(element=> element._id === ticket.project.id)
            project.tickets = project.tickets.filter(element=> element !== id)
            let comments = localStorageData.ticketCommentsAll;
            comments = comments.filter(element=> element.ticketId !== id);
            localStorageData.ticketsAll = localStorageData.ticketsAll.filter(element=> element._id !== id);
            console.log(localStorageData)
            updateLocalStorageData(localStorageData);
            window.location.href = '/';
        }
        
    }

    async function handleComment(){
        setError("")
        setLoading(true)

        let comment = {
            text: commentRef.current.value,
            author:{
                id: userData.foundUser._id,
                name: userData.name,
                avatar: userData.photoURL
            }
        }
        if(userData.mode === 'live'){
            await axios.post(`http://localhost:80/comments/ticket/${id}`, comment).then((response)=>{
                console.log("Comment: ", comment.author)
                console.log(response.data)
                setLoading(false)
            }).catch((error)=>{
                setLoading(false)
                console.log("Ticket.js>handleComment: ", error)
            })
        }else{
            comment.author = {
                id: userData.foundUser._id,
                name: userData.name
            }
            comment.ticketId = id;
            let localStorageData = getLocalStorageData();
            localStorageData.ticketCommentsAll = [...localStorageData.ticketCommentsAll, comment];
            updateLocalStorageData(localStorageData) 
            window.location.href = `http://localhost:3000/ticket/${id}`
        }   
        console.log("Comment: ", commentRef.current.value)
        commentRef.current.value = "";
        //window.location.reload(true)
    }


    const bannerStyle = {
        backgroundColor: "#336CFB", 
        display: "flex",
        height: "10.688rem", // 171px
        width: "100%",
        justifyContent: "space-between",
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

    const commentHeaderStyle={
        // backgroundColor: "blue", 
        display: "flex",
        // padding: "5px",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem"
      }

    const commentDisplayStyle = {

        borderRadius: "5px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "10px",
        overflowY: "scroll"
    }
      
    return(
        <div className="container">
            <div style={bannerStyle} > 
                <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title} >Ticket</h2>
                <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
            </div>
            <Container className="">
            <Card className="mt-0 w-100">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{ticket.name}</Card.Title>
                            <Card.Text>Description: {ticket.description}</Card.Text>
                            <Card.Text>Type: {ticket.type}</Card.Text>
                            <Card.Text>Priority: {ticket.priority}</Card.Text>
                            <Card.Text>Status: {ticket.status}</Card.Text>
                            <Card.Text>Created: {new Date(ticket.createdAt).toLocaleDateString()}</Card.Text>
                            <Card.Text>Private: {String(ticket.private)}</Card.Text>
                            {userData.foundUser._id === ticket.admin?
                                <div style={{display: 'flex'}}>
                                    <Button onClick={handleClick}>Update Ticket</Button>
                                    <Button className='btn btn-danger mx-2' onClick={handleDelete}>Delete</Button>
                                </div>
                                :
                                <></>
                             }
                        </Col>
                        <Col>
                            {/* <UserList ticket={ticket} /> */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </Container>
            <div style={commentHeaderStyle} > 
                <h2 className="mb-0 ms-2 mt-4">Comments</h2>
            </div>
            <Container className="">
                <Card className="mt-0 w-100" >
                    <Card.Body>
                        <Row>
                            {console.log("Comments: ", comments)}
                            {console.log("User Data: ", userData)}
                            <Col xs={6} style={commentDisplayStyle}>
                            {comments.map((comment)=>{
                                return(
                                    <Comment comment={comment} ticketId={id}/>
                                )
                            })}
                            </Col>
                            <Col xs={6}>
                                <Card.Title>Add Comment</Card.Title>
                                {error?? <Alert variant="danger">{error}</Alert>}
                                <FloatingLabel controlId="floatingTextarea" label="Comment..." className="mb-3">
                                    <Form.Control as="textarea" placeholder="Comment..." ref={commentRef} style={{minHeight: "10rem"}} />
                                </FloatingLabel>
                                <Button disabled={loading} onClick={handleComment} className="w-100">Submit</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}        