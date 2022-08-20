import React, {useState, useEffect} from 'react';
import { 
    Card, 
    Container,
    Row,
    Col 
} from 'react-bootstrap';
import { Link, useNavigate as useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useUserData } from '../../contexts/UserDataContext';
import EnlargeModal from '../../pages/analytics/EnlargeModal';
import NewProject from '../../pages/project/NewProject'
import SearchBarExpand from '../components/SearchBarExpand2';
import bannerImg from '../../assets/scrum-board-concept-illustration.png';
import projectCoverImage001 from '../../assets/project-cover-img-001.png';
import projectCoverImage002 from '../../assets/project-cover-img-002.png';
import projectCoverImage003 from '../../assets/project-cover-img-003.png';

const projectList = [
    {
        name: "Project001",
        color: "#",
        img: projectCoverImage001
    },
    {
        name: "Project002",
        color: "#",
        img: projectCoverImage002
    },
    {
        name: "Project003",
        color: "#",
        img: projectCoverImage003
    },
    {
        name: "Project004",
        color: "#",
        img: projectCoverImage001
    },
    {
        name: "Project005",
        color: "#",
        img: projectCoverImage002
    },
    {
        name: "Project006",
        color: "#",
        img: projectCoverImage003
    },
    {
        name: "Project007",
        color: "#",
        img: projectCoverImage001
    },
    {
        name: "Project008",
        color: "#",
        img: projectCoverImage002
    },
    {
        name: "Project009",
        color: "#",
        img: projectCoverImage003
    },
    {
        name: "Project010",
        color: "#",
        img: projectCoverImage001
    },
]

function generateRand(max){
    return Math.floor(Math.random() * (max - 1) + 1);
}

function generateProjectObject(arr){
    const returnArr = [];
    arr.forEach((project)=>{
        let rand = generateRand(4)
        let projectIMG = projectCoverImage001;
        switch(rand) {
            case 1:
              projectIMG = projectCoverImage001;
              break;
            case 2:
              projectIMG = projectCoverImage002;
              break;
            case 3:
              projectIMG = projectCoverImage003;
            break;
            default:
              projectIMG = projectCoverImage001;
        }
        const pushProject = {
            name: project.name,
            color: "#",
            img: projectIMG,
            description: project.description,
            id: project._id
        }
        returnArr.push(pushProject)
    })
    return returnArr;
}

function AddProjectCard(){
    const [modalShow, setModalShow] = useState(false);

    function onHide(){
        setModalShow(false)
      }
      
      function onShow(event){
          setModalShow(true)
      }

    const addProjectCardStyle = {
        backgroundColor: "#FFFFFF",
        // width: '15.625rem', //250px
        // height: '12.5rem', //200px
        width: '12.5rem', //200px
        height: '9.375rem', //150px
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        text: {
            color: "#336CFB",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        body: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        /* vertical shadow */
        boxShadow: "4px 0px 16px rgba(0, 0, 0, 0.08)",
    }

    return(
        // <div style={{marginRight: "1.5rem", marginLeft: "1.5rem"}}>
        <div style={{marginRight: "1.5rem"}}>
            <Card style={addProjectCardStyle}>
                <Card.Body style={addProjectCardStyle.body} >
                    <Card.Text style={addProjectCardStyle.text} >
                        <IconButton onClick={onShow}>
                            <AddIcon style={{fontStyle: "large"}} />
                        </IconButton>
                        Add Project
                    </Card.Text>
                </Card.Body>
            </Card>
            <EnlargeModal show={modalShow} onHide={onHide} >
                <NewProject onHide={onHide} />
            </EnlargeModal>
        </div>
    )
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 350,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}))(Tooltip);

function ProjectCard(props){

    const cardStyle = {
        // width: '15.625rem', //250px
        // height: '12.5rem', //200px
        width: '12.5rem', //200px
        height: '9.375rem', //150px
        borderRadius: "8px",
        overflow: "hidden",
        img: {
            // width: '15.625rem', //140px 8.75rem
            // height: '15.625rem', //140px 8.75rem
            width: '12.5rem', //200px
            height: '12.5rem', //200px
            paddingBottom: "1rem"
        },
        /* vertical shadow */
        boxShadow: "4px 0px 16px rgba(0, 0, 0, 0.08)",
    }

    const propStyles ={
        start:{
            width: "fit-content",
            marginRight: "1.719rem", //27.5px
        }, 
        mid:{
            width: "fit-content",
            marginLeft: "1.719rem", //27.5px
            marginRight: "1.719rem", //27.5px
        }, 
        end:{
            width: "fit-content",
            marginLeft: "1.719rem", //27.5px
        }
    }

    let projectTextStyle = {
        display: 'block',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        textDecoration: 'none', 
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }

    let tempStyle = {}

    /*
    this conditional block uses props passed from the parent elements state
    to apply styling to each element based on its order the display array 
    and if there is or isn't an add card being rendered
     */
    if(props.addCard === -1 && props.mapIndex === 0){
        tempStyle = propStyles.mid;
    }else if(props.addCard > 0 && props.mapIndex === 0){
        tempStyle = propStyles.start;
    }else if(props.mapIndex > 0 && props.mapIndex < props.mapLength - 1){
        tempStyle = propStyles.mid;
    }else{
        tempStyle = propStyles.end;
    }

    return(
        //<div style={{width: "fit-content", marginRight: "1.5rem", marginLeft: "1.5rem"}}>
        <div style={tempStyle}>
            <Card style={cardStyle}>
            <div style={{backgroundColor: "#FB5833", height: "8.75rem", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                <Card.Img style={cardStyle.img} variant="top" src={props.project.img} alt="Project Cover Image" />
            </div>
            <Card.Body>
                {props.project.id? 
                    <Card.Title> 
                        <HtmlTooltip style={{maxWidth:'180px'}} title={
                            <React.Fragment>
                            <Typography color="inherit">{props.project.name}</Typography>
                            <b>Description: </b>{`${props.project.description}`}
                            </React.Fragment>
                        }>
                            <Link style={projectTextStyle} to={`/project/${props.project.id}`}>{`${props.project.name}`}</Link>
                        </HtmlTooltip>
                    </Card.Title>
                    :
                    <Card.Title style={projectTextStyle} >{props.project.name}</Card.Title>
                }
                
                {/* <Card.Text>
                Description: Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text> */}
            </Card.Body>
            </Card>
        </div>
    )
}

function Pagination (props){
    const [windowSize, setWindowSize] = useState("xl")
    const [currProjects, setCurrProjects] = useState({first: -1, last: 2})
    const [previousDisabled, setPreviousDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(props.projectsAll.length < 4)
    const [paginationStep, setPaginationStep] = useState(4)
    const [searchTerm, setSearchTerm] = useState("");
    //const [displaySearch, setDisplaySearch] = useState(props.projects);
    const [displaySearch, setDisplaySearch] = useState(generateProjectObject(props.projectsAll)); // uses actual projects
    const sliceFirst = currProjects.first < 0? 0 : currProjects.first;
    const sliceLast = currProjects.last + 1;
    let displaying = displaySearch.slice(sliceFirst, sliceLast)
    const [displayingSearch, setDisplayingSearch] = useState(displaySearch)
    let displaying2 = displayingSearch.slice(sliceFirst, sliceLast)
    const [paginationWidth, setpPginationWidth] = useState("100%")
    const [searchWidth, setpSearchWidth] = useState("100%")
    const [paginationLeft, setpPginationLeft] = useState("0")

    //sets initial display size
    useEffect(()=>{
        let size = window.innerWidth
        if(size >= 1260){
            setWindowSize("xl")
        }else if(size < 1260){
            setWindowSize("lg")
            setCurrProjects({first: -1, last: 1})
            setPaginationStep(3)
        }else if(size < 1025 && size >= 769){
            setWindowSize("md")
            setCurrProjects({first: -1, last: 0})
            setPaginationStep(2)
        }else if(size < 769 && size >= 481){
            setWindowSize("sm")
            setCurrProjects({first: -1, last: -1})
            setPaginationStep(1)
        }else if(size < 481 && windowSize !== "xs"){
            setWindowSize("xs")
            setPaginationStep(1)
        }
    },[])

    //tracks window size and changes number of projects displaying
    window.onresize = ()=>{
        let size = window.innerWidth
        let first = currProjects.first;
        let last = currProjects.last;
        if(size >= 1260 && windowSize !== "xl"){
            setWindowSize("xl")
            setpPginationWidth("100%")
            setpSearchWidth("100%")
            setpPginationLeft("0")
            if(currProjects.first < 0 && currProjects.last < 2){
                setCurrProjects({first: -1, last: 2})
            }else{
                if(size < 1300){
                    setCurrProjects({first, last: first + 3})
                    setPaginationStep(4)
                }else{
                    setPaginationStep(4)
                    setCurrProjects({first, last})
                }
            }
        }else if(size < 1260 && size >= 1025 && windowSize !== "lg"){
            setWindowSize("lg")
            setpPginationWidth("80%")
            setpSearchWidth("88%")
            setpPginationLeft("6.7rem")
            if(currProjects.first < 0){
                setCurrProjects({first: -1, last: 1})
                setPaginationStep(3)
            }else{
                setCurrProjects({first, last: first + 2})
                setPaginationStep(3)
            }
        }else if(size < 1025 && size >= 769 && windowSize !== "md"){
            setWindowSize("md")
            setpPginationWidth("60%")
            setpSearchWidth("68%")
            setpPginationLeft("13.4rem")
            if(currProjects.first < 0){
                setCurrProjects({first: -1, last: 0})
                setPaginationStep(2)
            }else{
                setCurrProjects({first, last: first + 1})
                setPaginationStep(2)
            }
        }else if(size < 769 && size >= 481 && windowSize !== "sm"){
            setWindowSize("sm")
            setpPginationWidth("40%")
            setpSearchWidth("48%")
            setpPginationLeft("20.1rem")
            if(currProjects.first < 0){
                setCurrProjects({first: -1, last: -1})
                setPaginationStep(1)
            }else{
                setCurrProjects({first, last: first})
                setPaginationStep(1)
            }
        }else if(size < 481 && windowSize !== "xs"){
            setWindowSize("xs")
            setPaginationStep(1)
        }
        
    }

    const paginationStyle={
        display: "flex",
        width: paginationWidth, //"100%",
        height: '12.5rem', //200px
        // alignItems: "center",
        justifyContent: "center",
        margin: "0",

        displaying: {
            width: "60.313rem", //965px
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
        },

        project: {
            start:{
                marginRight: "1.719rem" //27.5px
            },
            mid:{
                marginRight: "1.719rem", //27.5px
                marginLeft: "1.719rem" //27.5px
            },
            end:{
                marginLeft: "1.719rem" //27.5px
            }
        }
    }
    
    function handlePrevious(){
        if(currProjects.first === -1){
            if(previousDisabled === false){
                setPreviousDisabled(true)
            }
        }else{
            let first = currProjects.first;
            let last = currProjects.last;
            last = first - 1;
            first -= paginationStep;
            setCurrProjects({first, last});
        }
        if(nextDisabled === true){
            setNextDisabled(false)
        }
    }

    function handleNext(){
        let first = currProjects.first;
        let last = currProjects.last;
        first = last + 1;
        last += paginationStep;
        if(currProjects.last >= props.projects.length - 1){
            if(nextDisabled === false){
                setNextDisabled(true)
            }
            last = props.projects.length - 1;
            first = currProjects.first;
            setCurrProjects({first, last});
        }else{
            if(nextDisabled === true){
                setNextDisabled(false)
            }
            setCurrProjects({first, last});
        }
        if(previousDisabled === true){
            setPreviousDisabled(false)
        }
        if(searchTerm !== "" && currProjects.last >= displayingSearch.length - 1){
            if(nextDisabled === false){
                setNextDisabled(true)
            }
        }
    }
    
    function handleChange(event){
        setSearchTerm(event.target.value);
        let tempArr = displaySearch.filter((project)=>{
            if(event.target.value === ""){
                return project
            }else if(project.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                return project
            }
        })
        setDisplayingSearch(tempArr)
        setCurrProjects({first: -1, last: 2});
    }

    const searchStyle = {
        width: searchWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "1rem"
    }

    const parentStyle = {
        position: "relative",
        top: "-3.313rem",
        left: paginationLeft,
        width: "100%",

    }

    return(
        <div style={parentStyle}>
            <div style={searchStyle}>
                <div style={{width:"40px", height:"40px", margin:"0"}}></div>
                <SearchBarExpand handleChange={handleChange} color="secondary" aria-label="Search" />
            </div>
            <div style={paginationStyle}>
                <IconButton disabled={previousDisabled} color="secondary" aria-label="previous" onClick={handlePrevious}>
                    <ChevronLeftIcon />
                </IconButton>
                <div style={paginationStyle.displaying}>
                    {
                        currProjects.first < 0? <AddProjectCard /> : <></>
                    }
                    {
                        currProjects.last < 0 && currProjects.first < 0?
                            <></>
                            :
                            searchTerm === ""?
                                displaying.map((project, index)=>{return(<ProjectCard addCard={currProjects.first} mapLength={displaying2.length} mapIndex={index} project={project}/>)})
                                :
                                // displaySearchTemp.map(project=>{return(<ProjectCard key={`${project.name}${searchTerm}`} project={project}/>)})
                                displaying2.filter((project)=>{
                                    if(searchTerm === ""){
                                        return project
                                    }else if(project.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return project
                                    }
                                }).map((project, index)=>{return(<ProjectCard addCard={currProjects.first} mapLength={displaying2.length} mapIndex={index} key={`${project.name}${searchTerm}`} project={project}/>)})
                    }
                </div>
                <IconButton disabled={nextDisabled} color="secondary" aria-label="next" onClick={handleNext}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </div>
    )
}


export default function Projects(){
    const history = useHistory();
    const { userData } = useUserData()

    const parentStyle = {
        display: "block",
        width: "100%",
        height: "17rem"
    }

    const bannerStyle = {
        backgroundColor: "#336CFB", 
        display: "flex",
        height: "10.688rem", // 171px
        width: "100%",
        justifyContent: "space-between",
        position: "absolute",
        title: {
            color: "#FFFFFF",
            fontWeight: "400"
        },
        img: {
            height: "10.688rem", // 171px
            width: "10.688rem", // 171px
        }
    }

    const bannerProjectStyle = {
        position: "relative"
    }

    const projectStyle={
        position: "absolute",
        width: "100%",
        top: "5.313rem", // 85px
        display: "flex",
        padding: "0",
        justifyContent: "space-around"
    }

    return(
        <div style={parentStyle} >
            <div style={bannerProjectStyle}>
                <div style={bannerStyle} > 
                    <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title} >Projects</h2>
                    <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
                </div>
                <Container style={projectStyle}>
                    <Pagination projects={projectList} projectsAll={userData.projectsAll}/>
                </Container>
            </div>

        </div>
    )
}