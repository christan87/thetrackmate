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
import bannerImg from '../../assets/scrum-board-concept-illustration.png';

export default function Analytics(){

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
        <div className="container">
        <div className="container" style={bannerStyle} > 
            <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title}>Analytics</h2>
            <div style={{display:"flex", alignItems:"center"}}>
                <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
            </div>
        </div>
            <div className="">
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
            </div>
        </div>
    )
}