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
import { useTypedSelector } from 'hooks/use-typed-selector';


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
  marginLeft: '15px',
  
};

type headeProps = any;

export default function HeaderAppBar(props: headeProps) {
  const state = useTypedSelector((state) => state);
  const { auth: { isAuthenticated } } = state;

  const classes = useStyles();
  const logout = async () => {
    try {
      await axios.post(`${baseURI}/api/users/signout`, {});
      window.location.replace('/login')
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:'#22313f'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/#/dashboard" style={{ color: '#fff' }}>
              Dashboard
            </Link>

          </Typography>
          <Link href="/films" style={hrStyle}>
            Film
          </Link>
         


          <Link href="/signup" style={hrStyle}>
            Signup
          </Link>
          {isAuthenticated ? <Button color="inherit" onClick={() => logout()}>
            <Typography>
            Logout
            </Typography>
            </Button> : <Link href="/login" style={hrStyle}>
            Login
          </Link>}



        </Toolbar>
      </AppBar>
    </div>
  );
}
