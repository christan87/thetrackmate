import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const styles = {
    minHeight: "100vh"
}

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className="d-flex justify-content-center align-items-center" style={styles}>
        <div className={classes.root}>
            <CircularProgress />
        </div>
    </div>
  );
}