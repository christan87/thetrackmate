import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
// import demoTickets from '../../services/demoTickets';
import { useUserData } from '../../contexts/UserDataContext';
import AccordianWrap from './AccordianWrap.ticket';
import '../../styles/Tickets.css'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  tableCell: {
      paddingTop: 0,
      paddingBottom: 0,
      border: "none"
  }
});

// CustomPaginationActionsTable takes in a prop tickets <Tickets tickets={tickets} />
export default function CustomPaginationActionsTable({tickets, moreDetails}) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { userData } = useUserData()
  // let rows = tickets.filter((ticket)=>{
  //   if(searchTerm === ""){
  //     return tickets;
  //   }else if(ticket.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())){
  //     return ticket
  //   }
  // }) || demoTickets.filter((ticket)=>{
  //   if(searchTerm === ""){
  //     return ticket;
  //   }else if(ticket.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
  //     return ticket;
  //   }
  // });
  let rows = []

  if(tickets){
    rows = tickets.filter((ticket)=>{
      if(searchTerm === ""){
        return ticket;
      }else if(ticket.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || ticket.project.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
        return ticket;
      }
    })
  }else if(userData.ticketsAll){
    rows = userData.ticketsAll.filter((ticket)=>{
      if(searchTerm === ""){
        return ticket;
      }else if(ticket.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || ticket.project.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
        return ticket;
      }
    })
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  function handleChange(event){
    setSearchTerm(event.target.value);
  }
  
  const style={
    backgroundColor: "blue", 
    display: "flex",
    padding: "5px"
  }

  return (
      <div className="mb-0 mt-2">
        <div style={style} > 
            <h4 className="mb-0 ms-5" >Tickets</h4>
            <input type="text" className="ms-auto mx-4 ps-2" placeholder='Search...' onChange={handleChange} />
        </div>
        <Container>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <AccordianWrap description={row.description} key={row.id}>
                      <TableRow>
                          <TableCell className={`${classes.tableCell} text-start text-truncate`} style={{ minWidth: 160, maxWidth: 160 }}  component="th" scope="row">
                              {row.name}
                          </TableCell>
                          <TableCell className={`${classes.tableCell} text-start`} style={{ width: 160 }} align="right">
                              {row.type}
                          </TableCell>
                          <TableCell className={`${classes.tableCell} text-start`} style={{ width: 160 }} align="right">
                              {row.priority}
                          </TableCell>
                          <TableCell className={`${classes.tableCell} text-start`} style={{ width: 160 }} align="right">
                              {row.status}
                          </TableCell>
                          <TableCell className={`${classes.tableCell} text-start`} style={{ width: 160 }} align="right">
                              {new Date(row.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className={`${classes.tableCell} text-start`} style={{ width: 160 }} align="right">
                              {row.private? "Private" : "Public"}
                          </TableCell>
                          <TableCell className={`${classes.tableCell} text-start text-truncate`} style={{ minWidth: 160, maxWidth: 160 }}  component="th" scope="row">
                              {!moreDetails?
                                <Link to={`/project/${row.project.id}`}>{row.project.name}</Link>
                                :
                                <Link to={`/ticket/${row._id}`}>More Details</Link>
                              }
                              
                              
                          </TableCell>
                      </TableRow>
                    </AccordianWrap>
                ))}

                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
            </TableContainer>
        </Container>
    </div>
  );
}
