import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthFirebaseContext";
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import { useUserData } from '../../contexts/UserDataContext';
import { Card, Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

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

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First Name..." />
                        </Form.Group>


                        {/* <Form.Row>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Last Name..." />
                            </Form.Group>
                        </Form.Row> */}

                        {/* <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Form.Row> */}

                        {/* <Form.Row>
                            <Form.Group controlId="formGridAddress3">
                                <Form.Label>Website</Form.Label>
                                <Form.Control placeholder="Website..." />
                            </Form.Group>
                        </Form.Row> */}
                    </Col>
                    <Col>
                        {/* <Form.Row>
                            <Form.Group controlId="formGridAddress3">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control type="textarea" placeholder="Website..." />
                            </Form.Group>
                        </Form.Row> */}
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Button variant="danger">
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
            height: "75vh",
            width: "75vw",
            marginTop: "3rem",
            /* vertical shadow */
            boxShadow: "4px 0px 16px rgba(0, 0, 0, 0.08)",
            borderRadius: "8px"
        },
    }

    return(   
        <Container style={profileStyle}>
            <Card style={profileStyle.card}>
                <Card.Body>
                    <DisplayIMG imgURL={userData.photoURL} />
                    <DisplayName />
                    {demoMode? <h2 className="text-center mb-4">{`Demo Role: ${demoUser.role}`}</h2> : <></>}
                    <div className="w-100 text-center mt-3">
                        <UserUpdateForm />
                        <Link to="">Place Holder 1</Link>
                        <Link className="ms-1" to="">Place Holder 2</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )

}