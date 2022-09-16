import React, { useState } from 'react';
import { useParams, Link, useNavigate as useHistory } from 'react-router-dom';
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
import bannerImg from '../../assets/scrum-board-concept-illustration.png';
import axios from 'axios';

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
    const history = useHistory();

    function onHide(){
        setModalShow(false)
    }
  
    function onShow(){
        setModalShow(true)
    }

    const deleteUserMessage = async(userId, messageId) =>{
        try{
            await axios.post(`http://localhost:80/messages/delete/${userId}/${messageId}`, {}).then((response)=>{
                if(response.data !== null && response.data !== undefined){
                  console.log("Delete Response: ", response)
                  window.location.href='/mail';
                }
            }).catch((error)=>{
                console.log("Mail>handleDelete: ", error)
            })
        }catch(e){
            console.log("Mail>handleDelete: ", e)
        }
    }

    function handleDelete(){
        const userId = userData.foundUser._id;
        deleteUserMessage(userId, id)
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
        <Container>
            <div className="container" style={bannerStyle} > 
                <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title}>Message</h2>
                <div style={{display:"flex", alignItems:"center"}}>
                    <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
                </div>
            </div>
            <div>
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
                                            <Button className="ms-2 p-1" style={{backgroundColor: "red", border: "none"}} onClick={handleDelete}><DeleteIcon fontSize="medium" /></Button>
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
            </div>
        </Container>
    )
}