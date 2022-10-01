import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import { useUserData } from '../../contexts/UserDataContext';
import { Card, Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import banner from '../../assets/user-banner.png'
import { FreeBreakfastOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import axios from 'axios'
const backend = process.env.REACT_APP_API;

function DisplayName(){
    const { currentUser } = useAuth();
    return(
        <>
            {!currentUser?
                <></>
                :
                <>{currentUser.displayName?  
                    <h2 className="text-center mb-4">{currentUser.displayName}</h2> 
                    : 
                    <h2 className="text-center mb-4">{currentUser.email}</h2> 
                }</>
            }

        </>
    )
}

function DisplayIMG(props){
    const { currentUser } = useAuth();
    return(
        <div className="d-flex justify-content-around">
            {!currentUser?
                <Avatar src="/broken-image.jpg" style={{width: "100px", height: "100px"}} className="my-3" />
                :
                <>{currentUser.photoURL?
                    <img src={props.imgURL} alt="profile picture" width="100" height="100" style={{borderRadius: "50%"}}  className="my-3"/>
                    :
                    <Avatar src="/broken-image.jpg" style={{width: "100px", height: "100px"}} className="my-3" />
                }</>
            }
        </div>
    )
}

function UserUpdateForm(props){
    const {fName, lName, email, website, bio} = props.data;
    const {userData} = useUserData();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const websiteRef = useRef();
    const bioRef = useRef();
    const [userAccountData, setUserAccountData] = useState({})
    const {updateDisplayName, currentUser} = useAuth();
    const {updateLocalStorageData, getLocalStorageData, removeLocalStorageData} = useDemoAuth();

    useEffect(()=>{
        let temp = {}
        if(userData.mode !== "demo" && userData.foundUser.userData){
            temp.firstName = userData.foundUser.userData.firstName;
            temp.lastName = userData.foundUser.userData.lastName;
            temp.email = userData.foundUser.userData.email;
            temp.website = userData.foundUser.userData.website;
            temp.bio = userData.foundUser.userData.bio;
        }
        setUserAccountData(temp)
    },[])

    async function handleSubmit(e){
        //e.preventDefault()
        console.log("UserAccountData: ", userAccountData)
        const accountData = {
            firstName: fNameRef.current.value,
            lastName: lNameRef.current.value,
            email: emailRef.current.value,
            website: websiteRef.current.value,
            bio: bioRef.current.value
        }
        if(userData.mode === "live"){
            axios.post(`${backend}/users/update-data/${userData.foundUser._id}`, accountData).then((response)=>{
                console.log("Response: ", response.data)
            }).catch((err)=>{
                console.log("User2.js>UserUpdateForm>handleSubmit: ", err)
            })
            try{
                let name = `${accountData.firstName} ${accountData.lastName}`
                updateDisplayName(currentUser, name);
            }catch(e){
                console.log("updateDisplayName: ", e)
            }
        }else{
            let localStorageData = getLocalStorageData();
            localStorageData.foundUser.userData = accountData;
            updateLocalStorageData(localStorageData)
            
        }
        console.log("submitted......", accountData)
    }

    const formStyles={
        group:{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem"
        },
        control: {
            width: "80%"
        },
        textArea:{
            width: "90%",
            height: "12.5rem"
        },
        btn:{
            marginRight:"1rem"
        }
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>

                        <Form.Group style={formStyles.group} controlId="formGridAddress1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control style={formStyles.control} ref={fNameRef} defaultValue={userAccountData.firstName || fName} placeholder="First Name..." />
                        </Form.Group>
                        <Form.Group style={formStyles.group} controlId="formGridAddress2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control style={formStyles.control} ref={lNameRef} defaultValue={userAccountData.lastName || lName} placeholder="Last Name..." />
                        </Form.Group>

                        <Form.Group style={formStyles.group} as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control style={formStyles.control} type="email" ref={emailRef} defaultValue={userAccountData.email || email} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group style={formStyles.group} controlId="formGridAddress3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control style={formStyles.control} ref={websiteRef} defaultValue={userAccountData.website || website} placeholder="https://..." />
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group style={formStyles.group} controlId="formGridAddress3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control style={formStyles.textArea} as="textarea"  ref={bioRef} defaultValue={userAccountData.bio || bio} placeholder="Bio..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Button style={formStyles.btn} variant="primary" type="submit">
                    Submit
                </Button>

                <Button style={formStyles.btn} variant="danger">
                    Cancel
                </Button>

            </Form>
        </div>
    )
}

export default function User(){
    const { id } = useParams();
    const { userData } = useUserData();
    const { demoMode, demoUser} = useDemoAuth();
    const [flName, setFlName] = useState([]); 
    const [formData, setFormData] = useState({});

    console.log("UserData: ", userData)
    useEffect(()=>{
        const fullName = [];
        let myNameArray = []
        let newFormData = {};
        
        if(userData.mode !== "demo"){
            myNameArray = userData.foundUser.name.split(" ");
            newFormData.email = userData.foundUser.email || "";
            newFormData.website = userData.website || "";
            newFormData.bio = userData.bio || "";
        }else{
            myNameArray = [userData.foundUser.userData.firstName, userData.foundUser.userData.lastName]
            newFormData.email = userData.foundUser.userData.email || "";
            newFormData.website = userData.foundUser.userData.website || "";
            newFormData.bio = userData.foundUser.userData.bio || "";
        }


        myNameArray.forEach((name)=>{
            if(name.includes("(")){
    
            }else{
                fullName.push(name)
            }
        })
        if(fullName.length === 2){
            setFlName(fullName);
        }else{
            setFlName([fullName[0], fullName[fullName.length-1]]);
        }

        newFormData.fName = fullName[0] || "";
        newFormData.lName = fullName[fullName.length-1] || "";
        setFormData(newFormData);
    },[])

    const profileStyle = {
        display: "flex",
        justifyContent: "center",
        card:{
            height: "80vh",
            width: "75vw",
            // marginTop: "3rem",
            /* vertical shadow */
            boxShadow: "4px 0px 16px rgba(0, 0, 0, 0.08)",
            // borderRadius: "8px",
            backgroundImage:`url(${banner})`, 
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto"
        },
        container:{

        }
    }

    return(   
        <Container style={profileStyle}>
            <Card style={profileStyle.card}>
                <Card.Body>
                    <Container style={profileStyle.container}>
                    <DisplayIMG imgURL={userData.photoURL} />
                    <DisplayName />
                    {demoMode? <h2 className="text-center mb-4">{`Demo Role: ${demoUser.role}`}</h2> : <></>}
                    <div className="w-100 text-center mt-3">
                        <UserUpdateForm data={formData} />
                    </div>
                    </Container>

                </Card.Body>
            </Card>
        </Container>
    )

}