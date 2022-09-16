import React, { useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useUserData } from "../../contexts/UserDataContext";
import { Link } from 'react-router-dom';
import {default as LinkReload} from '@material-ui/core/Link';
import { Container } from 'react-bootstrap';
import SearchBarExpand from '../components/SearchBarExpand2';
import bannerImg from '../../assets/scrum-board-concept-illustration.png';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';


const columns = [
    {id: 'name', label: 'Name', minWidth: 280},
    {id: 'email', label: 'Email', minWidth: 500},

]

function createData(name, email, id, photoURL) {
  return { name, email, id, photoURL };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const ProfIMG = (props)=>{
  const profStyle={
    width: "30px",
    height: "30px",
    borderRadius: "50%"
  }

  const photoURL = props.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return(
    <div style={profStyle} >
      <img style={profStyle} src={photoURL} alt="Profile IMG"></img>
    </div>
  )
}

export default function Users() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserData();
  
  let rows= [];
  let users = [];

  if(userData.mode === "demo"){
    users = userData.usersAll.filter((user)=> user.private == false)

  }else{
    users = userData.usersAll;
  }

  console.log("UserList: ", users)
  users.forEach((user)=>{
    rows.push(createData(user.name, user.email, user._id, user.photoURL))
  })

  function handleChange(event){
      setSearchTerm(event.target.value);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const style={
    backgroundColor: "blue", 
    display: "flex",
    padding: "5px"
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

const searchStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: "1rem",
  position: "relative",
  top: "-8.68rem",
    // right: "6.3rem"
}

  return (
    
    <div className="container" >     
    {console.log("Users: ", users)}
      <div className="container" style={bannerStyle} > 
          <h2 className="mb-0 ms-2 mt-2" style={bannerStyle.title}>Users</h2>
          <div style={{display:"flex", alignItems:"center"}}>
            <img alt="banner illustration" src={bannerImg} style={bannerStyle.img} />
          </div>
      </div>
      <div style={searchStyle}>
          <div style={{width:"40px", height:"40px", margin:"0"}}></div>
          <SearchBarExpand handleChange={handleChange} color="secondary" aria-label="Search" />
      </div>
      <Container style={{padding:"0", position:"relative", top:"-2.55rem"}}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((row)=>{
                  if(searchTerm === ""){
                    return row;
                  }else if(row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.email.toLowerCase().includes(searchTerm.toLowerCase())){
                    return row;
                  }
                }).map((row) => {
                  return (
                    
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id === "name"? 
                                    <HtmlTooltip style={{maxWidth:'180px'}} placement="right" title={
                                      <React.Fragment>
                                      <div style={{display:"flex", justifyContent: "center"}}>
                                        <ProfIMG photoURL={row.photoURL}/>
                                        <Typography style={{marginLeft: "0.25rem"}} color="inherit">{row.name}</Typography>

                                      </div>

                                      </React.Fragment>
                                    }>
                                      {/* <Link onClick={() => window.location.href=`/user/${row.id}`} to={`/user/${row.id}`}>{column.format && typeof value === 'number' ? column.format(value) : value}</Link> */}
                                      <LinkReload href={`/user/${row.id}`}>{column.format && typeof value === 'number' ? column.format(value) : value}</LinkReload>
                                    </HtmlTooltip>
                                    : 
                                    <>{column.format && typeof value === 'number' ? column.format(value) : value}</>
                                }
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
}
