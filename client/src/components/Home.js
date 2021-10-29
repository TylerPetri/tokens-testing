import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, CssBaseline, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { logout } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, logout } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user.id]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to='/login' />;
    return <Redirect to='/register' />;
  }

  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
