import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { baseURI } from 'config/networks';
import Link from '@material-ui/core/Link';
axios.defaults.withCredentials = true;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const hrStyle = {
      color: '#fff', 
      textDecoration: 'none',
      marginLeft: '15px'
    };

type headeProps = any;

export default function HeaderAppBar(props:headeProps) {
  const classes = useStyles();
  const logout = async() => {
    // Send the http request to remove the session 
    try {
       await axios.post(`${baseURI}/api/users/signout`, {});
       window.location.replace('/#/login')
    } catch (err) {
      console.error(err);
    }
    
    
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link href="/#/dashboard" style = {{color: '#fff'}}>
          Dashboard
         </Link>
          
          </Typography>
          <Link href="/#/top-plants" style = {hrStyle}>
           Top Plants
         </Link>
         <Link href="/#/states-plants-mwh-aggregation" style = {hrStyle}>
           States MWH
         </Link>

          <Button color="inherit" onClick = {() => logout()}>Logout</Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
