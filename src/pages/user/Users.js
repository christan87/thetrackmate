import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import demoUsers from '../../services/demoUsers';
import { useUserData } from "../../contexts/UserDataContext";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from "axios";
const columns = [
    {id: 'name', label: 'Name', minWidth: 280},
    {id: 'email', label: 'Email', minWidth: 500},

]

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

function createData(name, email, id) {
  return { name, email, id };
}

// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
//   }

// let rows= [];
// const users = useUserData.userData.usersAll.filter((user)=> user.private == false)
// users.forEach((user)=>{
//     rows.push(createData(user.name, user.email, user.id))
// })

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Users() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserData();
  
  let rows= [];
  let users = [];

  // async function getUsers(){
  //   let users = [];
  //   await axios.get("http://localhost:5000/users").then((response)=>{
  //     users = response.data
  //   }).catch((error)=>{
  //     console.log("Users.js>getUsers>error: ", error)
  //   })
  //   return users;
  // }

  // function defineRows(users){
  //   users.forEach((user)=>{
  //     rows.push(createData(user.name, user.email, user._id))
  //   })
  // }

  // useEffect(()=>{
  //   if(userData.mode === "demo"){
  //     users = userData.usersAll.filter((user)=> user.private == false)

  //   }else{
  //     users = userData.usersAll;
  //     console.log("UserList222: ", users)
  //   }

  // },[])

  if(userData.mode === "demo"){
    users = userData.usersAll.filter((user)=> user.private == false)

  }else{
    users = userData.usersAll;
  }

  console.log("UserList: ", users)
  users.forEach((user)=>{
    rows.push(createData(user.name, user.email, user._id))
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
  return (
    <div>     
      <div className="container" style={style} > 
          <h4 className="mb-0 ms-5" >Users</h4>
          <input type="text" className="ms-auto mx-4 ps-2" placeholder='Search...' onChange={handleChange} />
      </div>
      <Container>
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
                                    <Link to={`/user/${row.id}`}>{column.format && typeof value === 'number' ? column.format(value) : value}</Link>
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
