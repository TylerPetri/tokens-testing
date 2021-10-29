import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  FormControl,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { login } from './store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: 'Open Sans, sans-serif',
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  button: {
    width: '150px',
    fontFamily: 'Montserrat, sans-serif',
  },
  HeaderGrid: {
    gap: '25px',
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user._id) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Box m={5}>
          <Grid
            className={classes.HeaderGrid}
            container
            item
            justifyContent='flex-end'
            alignItems='center'
          >
            <Typography color='secondary'>Don't have an account?</Typography>
            <Button color='primary' onClick={() => history.push('/register')}>
              Create account
            </Button>
          </Grid>
        </Box>
        <h1 className={classes.font}>Login</h1>
        <form onSubmit={handleLogin} className={classes.formGrid}>
          <FormControl fullWidth>
            <TextField
              aria-label='username'
              label='Username'
              name='username'
              type='text'
            />
          </FormControl>
          <FormControl fullWidth required>
            <TextField
              label='Password'
              aria-label='password'
              type='password'
              name='password'
            />
          </FormControl>
          <Button
            className={classes.button}
            color='primary'
            type='submit'
            variant='contained'
            size='large'
          >
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
