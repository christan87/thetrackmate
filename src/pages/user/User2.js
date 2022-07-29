import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import { useUserData } from '../../contexts/UserDataContext';
import { Card, Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import banner from '../../assets/user-banner.png'

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
                <></>
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

    function handleSubmit(){
        console.log("submitted......")
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
                            <Form.Control style={formStyles.control} placeholder="First Name..." />
                        </Form.Group>

                        <Form.Group style={formStyles.group} controlId="formGridAddress2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control style={formStyles.control} placeholder="Last Name..." />
                        </Form.Group>

                        <Form.Group style={formStyles.group} as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control style={formStyles.control} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group style={formStyles.group} controlId="formGridAddress3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control style={formStyles.control} placeholder="https://..." />
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group style={formStyles.group} controlId="formGridAddress3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control style={formStyles.textArea} as="textarea" placeholder="Bio..." />
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
                        <UserUpdateForm />
                        <Link to="">Place Holder 1</Link>
                        <Link className="ms-1" to="">Place Holder 2</Link>
                    </div>
                    </Container>

                </Card.Body>
            </Card>
        </Container>
    )

}