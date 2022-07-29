import React from 'react';
import { 
    Card, 
    Container,
    Row,
    Col
} from 'react-bootstrap';
import BarGraph from './BarGraph';
import PieChart from './PieChart';
import LineChart from './LineChart';
import PolarAreaChart from './PolarAreaChart';


export default function Analytics(){

    return(
        <div className="container">
            <div style={{backgroundColor: "blue"}} > 
                <h4 className="mb-0 ms-5" >Analytics</h4>
            </div>
            <Container className="">
                <Card className="mt-0 w-100">
                    <Card.Body>
                        <Row className="mb-3">
                            <Col xs={6}>
                                <Card>
                                    <Card.Body>
                                    <BarGraph />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6} >
                                <Card>
                                    <Card.Body>
                                        <PieChart maxHeight={16.4}/>  
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Card>
                                    <Card.Body>
                                        <LineChart minHeight={16.4} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card>
                                    <Card.Body>
                                        <PolarAreaChart maxHeight={16.4}/>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}