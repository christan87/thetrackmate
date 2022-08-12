import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import MailSearchBar from './MailSearchBar';

import { Button } from 'react-bootstrap';

import EnlargeModal from '../analytics/EnlargeModal';
import NewMessage from './NewMessage';
import {useDemoAuth} from "../../contexts/AuthDemoContext";
// import demoMessages from '../../services/demoMessages';
import { useUserData } from "../../contexts/UserDataContext";
import { Link } from 'react-router-dom';

import axios from 'axios'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function createData2(sender, subject, date, id) {
    return { sender, subject, date, id };
  }

const rows2 = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

//b[orderBy] access the property "orderBy" of object "b"
//and compares it to the property "orderBy" of object "a"
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'Sender', numeric: false, disablePadding: true, label: 'Sender' },
  { id: 'Subject', numeric: true, disablePadding: false, label: 'Subject' },
  { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, searchMessages, resetMessages } = props;
  const [modalShow, setModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function onShow(event){
    setModalShow(true)
  }

  function onHide(){
    setModalShow(false)
  }

  function handleChange(event){
    setSearchTerm(event.target.value);
    if(event.target.value === ""){
      resetMessages();
    }
  }

  function handleSearch(){
    searchMessages(searchTerm)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Mail
        </Typography>
      )}
      <MailSearchBar handleChange={handleChange} handleSearch={handleSearch}/>
      <Button className="text-nowrap" onClick={onShow}>New Message</Button>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={props.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <EnlargeModal show={modalShow} onHide={onHide} >
        <NewMessage />
      </EnlargeModal>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Mail() {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows]= useState([]);
  const [allRows, setAllRows] = useState([]);

  const {demoUser} = useDemoAuth();
  const { userData } = useUserData();
  // const messages = demoMessages.filter((message)=>message.recipientId === demoUser._id);
  let messages = userData.messages || [];

  let tempRows = []

  useEffect(()=>{
    messages.forEach((message)=>{
      let date = new Date(message.createdAt).toLocaleDateString()
      const data = createData2(message.author.name, message.subject, date, message._id)
      tempRows.push(data)
    })
    tempRows = tempRows.reverse()
    setRows(tempRows)
    setAllRows(tempRows)
  },[])

  const refreshRows = (newMessages)=>{
    //let refresh = []
    try{
      // console.log("Entered")
      // newMessages.forEach((message)=>{
      //   let date = new Date(message.createdAt).toLocaleDateString()
      //   const data = createData2(message.author.name, message.subject, date, message._id)
      //   refresh.push(data)
      // })
      setRows(newMessages)
      setSelected([]);
    }catch(err){
      console.log("refreshRows>Err: ", err)
    }

  }

  const searchMessages = (searchTerm)=>{
    let newMessages = rows;
    newMessages= newMessages.filter(message => message.sender.toLowerCase().includes(searchTerm.toLowerCase()) || message.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    refreshRows(newMessages);
  }

  const resetMessages = ()=>{
    setRows(allRows)
  }

  const deleteUserMessage = async(userId, messageId) =>{
    try{
        await axios.post(`http://localhost:80/messages/delete/${userId}/${messageId}`, {}).then((response)=>{
            if(response.data !== null && response.data !== undefined){
              console.log("Delete Response: ", response)
            }
        }).catch((error)=>{
            console.log("Mail>handleDelete: ", error)
        })
    }catch(e){
        console.log("Mail>handleDelete: ", e)
    }
  }

  const deleteUserMessages = async(userId, messages) =>{
    try{
        await axios.post(`http://localhost:80/messages/multidelete/${userId}`, {messages: messages}).then((response)=>{
            if(response.data !== null && response.data !== undefined){
              console.log("Delete Response: ", response)
            }
        }).catch((error)=>{
            console.log("Mail>handleDelete: ", error)
        })
    }catch(e){
        console.log("Mail>handleDelete: ", e)
    }
  }

  const handleDelete = async ()=>{
    let newMessages = rows;
    /*
      if more than 1 message is selected the deleteUserMessages function submits to the 
      "/messages/multidelete/:userId" endpoing and sends an array of ids insted of a single message
      id to be deleted, then it filters the newMessages array which has been set to rows and passes
      it to the refreshRows function to refresh the displayed messages
    */
    if(selected.length > 1){
      await deleteUserMessages(userData.foundUser._id, selected)
      let selectStr = []
      selected.forEach(select=> selectStr.push(select.toString()))
      newMessages = newMessages.filter(newMsg => !selectStr.includes(newMsg.id))
      refreshRows(newMessages)
    }else{
      await deleteUserMessage(userData.foundUser._id, selected[0])
      newMessages = newMessages.filter(msg=>msg.id !== selected[0]);
      refreshRows(newMessages)
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} resetMessages={resetMessages} searchMessages={searchMessages}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {<Link to={`/mail/message/${row.id}`}>{row.sender}</Link>}
                      </TableCell>
                      <TableCell align="right">{row.subject}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}