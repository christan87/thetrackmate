import React from "react";
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDemoAuth } from "../../contexts/AuthDemoContext";
import DisplayIMG from './DisplayIMG';
import DisplayName from './DisplayName';

export default function User(props){
    const { demoMode, demoUser, setDemoRole, demoLoading } = useDemoAuth();
    return(   
        <Container>
            <Card style={{height: "75vh"}}>
                <Card.Body>
                    <DisplayIMG imgURL={props.imgURL} />
                    <DisplayName />
                    {demoMode? <h2 className="text-center mb-4">{`Demo Role: ${demoUser.role}`}</h2> : <></>}
                    <div className="w-100 text-center mt-3">
                        <Link to="">Place Holder 1</Link>
                        <Link className="ms-1" to="">Place Holder 2</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}