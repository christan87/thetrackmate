import React, {useState} from 'react';
import { 
    Card, 
    Container,
    Row,
    Col 
} from 'react-bootstrap';
import { Link, useNavigate as useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
// import projects from '../../services/demoProjects';
import { useUserData } from '../../contexts/UserDataContext';

export default function Projects(){
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");
    const { userData } = useUserData()

    function handleChange(event){
        setSearchTerm(event.target.value);
    }

    const style={
        backgroundColor: "blue", 
        display: "flex",
        padding: "5px"
    }

    return(
        <div>
            <div style={style} > 
                <h4 className="mb-0 ms-5" >Projects</h4>
                <input type="text" className="ms-auto mx-4 ps-2" placeholder='Search...' onChange={handleChange} />
            </div>
            <Container>
                <Card className="mt-0">
                    <Card.Body>
                        <Row>
                            {userData.projectsAll&& userData.projectsAll.filter((project)=>{
                                if(searchTerm === ""){
                                    return project;
                                }else if(project.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return project
                                }
                            }).map((project)=>{
                                return(
                                    <Col xs={12} sm={6} md={4} lg={2} key={project._id} >
                                        <Link to={`project/${project._id}`} style={{textDecoration: "none", color:"black"}}>
                                            <span>
                                                <Card className="mx-2">
                                                    <Card.Body>
                                                        <Card.Title>{project.name}</Card.Title>
                                                        <Divider className="my-1" component="div" />
                                                        <Card.Text>{project.description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </span>
                                        </Link>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}