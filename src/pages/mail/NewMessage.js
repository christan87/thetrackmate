import React, { useRef, useState, useEffect } from "react";
import { 
    Card,
    Form,
    Button, 
    Alert,
    FloatingLabel,
    Container
} from 'react-bootstrap'
import { Link, useNavigate as useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import demoProjects from '../../services/demoProjects';
import demoUsers from '../../services/demoUsers';
import { useUserData } from "../../contexts/UserDataContext";
import Autocomplete from "../../components/AutoComplete";
import axios from "axios";
const backend = process.env.REACT_APP_API;

export default function NewMessage(props){
    const subjectRef = useRef();
    const userRef = useRef();
    const messageRef = useRef();
    const { currentUser } = useAuth();
    const { demoUser } = useDemoAuth();
    const { userData } = useUserData();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [autoValue, setAutoValue] = useState([]);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        setError("");
        let tempRef =  document.getElementById("customized-hook-demo").value
        console.log("tempRef: ", tempRef)
        if(userData.mode === "live"){

            let newMessage = {
                type: "message",
                subject: subjectRef.current.value,
                text: messageRef.current.value,
                author: userData.foundUser._id,
                read: false
            }
    
            try{
                //newMessage.recipient = userData.usersAll.find((user)=> user.email === userRef.current.value)._id;
                // newMessage.recipient = autoValue;
            }catch(error){
                console.log("NewMessage.js>newMessage.recipient> ", error)
            }
    
            if(subjectRef.current.value === ""){
                return setError("Fill in all fields...")
            // }else if(userRef.current.value === ""){
            //     return setError("Fill in all fields...")
            }else if(autoValue.length === 0){
                return setError("Fill in all fields...")
            }else if(messageRef.current.value === ""){
                return setError("Fill in all fields...")
            }
            console.log("newMessage: ", newMessage)
            autoValue.forEach(async recipient =>{
                newMessage.recipient = recipient._id;
                await axios.post(`${backend}/messages/message/${newMessage.recipient}`, newMessage).then((response)=>{
                    console.log(response.data)
                }).catch((error)=>{
                    console.log("NewMessage.js>handleSubmit>axios.post> ", error)
                })
            })

        }else if(userData.mode === "demo"){
            
            let newMessage = {
                type: "message",
                subject: subjectRef.current.value,
                text: messageRef.current.value,
                author: userData.id,
                read: false
            }

            try{
                newMessage.recipient = userData.usersAll.find((user)=> user.email === userRef.current.value)._id;
            }catch(error){
                console.log("NewMessage.js>newMessage.recipient> ", error)
            }

            if(subjectRef.current.value === ""){
                return setError("Fill in all fields...")
            }else if(userRef.current.value === ""){
                return setError("Fill in all fields...")
            }else if(messageRef.current.value === ""){
                return setError("Fill in all fields...")
            }
            console.log("newMessage: ", newMessage)
        } 


        if(props.onHide){
            props.onHide()
        }
        setLoading(false)
        //history("/")    
    }

    const handleAutoCompleteValue = (value)=>{
        setAutoValue(value)
        console.log("autoVlue: ", autoValue)
    }

    return(
        <>
            <Container>
                <div
                    className="d-flex mt-5 justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "700px" }}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">New Message</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                     <FloatingLabel controlId="floatingNameField" label="Subject" className="mb-3">
                                        <Form.Control type="text" placeholder="Leave Subjecte Here" ref={subjectRef} />
                                    </FloatingLabel>  
                                    <Autocomplete autoCompleteOptions={userData.usersAll} handleAutoCompleteValue={handleAutoCompleteValue} />  
                                    {/* <FloatingLabel controlId="floatingNameField" label="to" className="mb-3">
                                        <Form.Control type="text" placeholder="enter username" ref={userRef} />
                                    </FloatingLabel>                 */}
                                    <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                                        <Form.Control as="textarea" placeholder="Write Ticket Description here" ref={messageRef} style={{minHeight: "20rem"}} />
                                    </FloatingLabel>
                                    <Button disabledd={loading} type="submit" className="w-100">Send Message</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <Link to="/">Cancel</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}