import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Card,
    Container,
    Row,
    Col,
    Button,
    FloatingLabel,
    Form
} from 'react-bootstrap';
import UserList from '../../components/UserList';
import demoTickets from '../../services/demoTickets';
import demoTicketComments from '../../services/demoTicketComments';
import {useNavigate as useHistory } from 'react-router-dom';

export default function Ticket(){

    const { id } = useParams();
    const ticket = demoTickets.find(element => element.id === id);
    const comments = demoTicketComments.filter(element => element.ticketId === String(id));
    const commentRef = useRef();
    const [loading, setLoading] = useState(false) 
    const history = useHistory()

    const handleClick = ()=>{
        history(`/ticket/update/${id}`)
    }

    function handleComment(){
        setLoading(true)
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
                            <Card.Text>Created: {ticket.date}</Card.Text>
                            <Card.Text>private: {String(ticket.private)}</Card.Text>
                            <Button onClick={handleClick}>Update Ticket</Button>
                        </Col>
                        <Col>
                            <UserList ticket={ticket} />
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
                                        <Card.Text><strong>Date: </strong>{comment.date}</Card.Text>
                                    </div>
                                )
                            })}
                            </Col>
                            <Col xs={6}>
                                <Card.Title>Add Comment</Card.Title>
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