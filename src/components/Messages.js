import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiBadge-root': {
      marginRight: theme.spacing(2),
    },
  },
  inner: {
    margin: "0"
  }
}));

export default function Messages(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(props.count);


  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Badge color="secondary" badgeContent={count}>
          <Link style={{color: "black"}} to="/mail">
            <MailIcon fontSize="large" style={{color: "grey"}}/>
          </Link>
        </Badge>
      </div>
    </div>
  );
}
