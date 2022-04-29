import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import demoMessages from '../../services/demoMessages';
import { useUserData } from "../../contexts/UserDataContext";
import { 
    Card,
    Form,
    Button, 
    Alert,
    Container
} from 'react-bootstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import Reply from './Reply';
import EnlargeModal from '../analytics/EnlargeModal';

export default function Message(){

    const { id } = useParams();
    const { userData } = useUserData();
    const message = userData.messages.find((message)=> message._id === id);
    const style={
        backgroundColor: "blue", 
        display: "flex",
        padding: "5px"
    }

    const [modalShow, setModalShow] = useState(false);
  
    function onHide(){
        setModalShow(false)
    }
  
    function onShow(){
        setModalShow(true)
    }

    return(
        <Container>
            <div style={style} > 
                <h4 className="mb-0 ms-5" >Message</h4>
            </div>
        
            <Container>
                    <div
                        className="d-flex justify-content-center"
                        style={{ minHeight: "75vh" }}
                    >
                        <div className="w-100">
                            <Card className="mt-0" style={{minHeight:"75vh"}}>
                                <Card.Body>
                                    <Card.Title>{`-From: ${message.author.name}`}</Card.Title>
                                    <Card.Header style={{minHeight: "3rem"}}>
                                        <div className="d-flex align-items-center">
                                            <span><strong>Subject:</strong> {` ${message.subject}`}</span>
                                            <Button className="ms-auto btn-sm" onClick={onShow}>Reply</Button>
                                            <Button className="ms-2 p-1" style={{backgroundColor: "red", border: "none"}}><DeleteIcon fontSize="medium" /></Button>
                                        </div>

                                    </Card.Header>
                                    <Card className="mt-2" style={{minHeight:"75vh"}}>
                                        <Card.Body>
                                            <Card.Text>{message.text}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    
                                </Card.Body>
                            </Card>
                            <EnlargeModal show={modalShow} onHide={onHide}>
                                <Reply onHide={onHide} replyId={message.author._id}/>
                            </EnlargeModal>
                            <div className="w-100 text-center mt-2">
                                <Link to="/mail">Inbox</Link>
                            </div>
                        </div>
                    </div>
            </Container>
        </Container>
    )
}