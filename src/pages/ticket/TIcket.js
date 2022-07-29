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
import axios from "axios"

export default function Ticket(){

    const { id } = useParams();
    const { userData } = useUserData();
    const ticket = userData.ticketsAll.find(element => element._id === id);
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

        await axios.post(`http://localhost:5000/comments/ticket/${id}`, comment).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log("Ticket.js>handleComment: ", error)
        })

        console.log("Comment: ", commentRef.current.value)
        commentRef.current.value = "";
    }



    return(
        <div className="container">
            <div style={{backgroundColor: "blue"}} > 
                <h4 className="mb-0 ms-5" >Ticket</h4>
            </div>
            <Container className="">
            <Card className="mt-0 w-100">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{ticket.name}</Card.Title>
                            <Card.Text>description: {ticket.description}</Card.Text>
                            <Card.Text>type: {ticket.type}</Card.Text>
                            <Card.Text>priority: {ticket.priority}</Card.Text>
                            <Card.Text>status: {ticket.status}</Card.Text>
                            <Card.Text>Created: {new Date(ticket.createdAt).toLocaleDateString()}</Card.Text>
                            <Card.Text>private: {String(ticket.private)}</Card.Text>
                            <Button onClick={handleClick}>Update Ticket</Button>
                        </Col>
                        <Col>
                            {/* <UserList ticket={ticket} /> */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </Container>
            <div style={{backgroundColor: "blue"}} > 
                <h4 className="mt-2 mb-0 ms-5" >Comments</h4>
            </div>
            <Container className="">
                <Card className="mt-0 w-100">
                    <Card.Body>
                        <Row>
                            <Col xs={6}>
                            {comments.map((comment)=>{
                                return(
                                    <div className="mb-2">
                                        <Card.Text className="mb-0"><strong>{`${comment.author.name}: `}</strong>{comment.text}</Card.Text>
                                        <Card.Text><strong>Date: </strong>{new Date(comment.createdAt).toLocaleDateString()}</Card.Text>
                                    </div>
                                )
                            })}
                            </Col>
                            <Col xs={6}>
                                <Card.Title>Add Comment</Card.Title>
                                {error?? <Alert variant="danger">{error}</Alert>}
                                <FloatingLabel controlId="floatingTextarea" label="Comment..." className="mb-3">
                                    <Form.Control as="textarea" placeholder="Comment..." ref={commentRef} style={{minHeight: "10rem"}} />
                                </FloatingLabel>
                                <Button disabledd={loading} onClick={handleComment} className="w-100">Submit</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}