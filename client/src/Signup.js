import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';
import { register } from './store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: 'Open Sans, sans-serif',
  },
  formGrid: {
    width: '80%',
    margin: '0 auto',
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
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <Grid container sx={{ maxWidth: '500px', margin: '0 auto' }}>
      <Grid container item xs direction='column'>
        <Box m={5}>
          <Grid
            className={classes.HeaderGrid}
            container
            item
            justifyContent='flex-end'
            alignItems='center'
          >
            <Typography color='secondary'>Already have an account?</Typography>
            <Button color='primary' onClick={() => history.push('/login')}>
              Login
            </Button>
          </Grid>
        </Box>
        <Grid item xs>
          <form onSubmit={handleRegister}>
            <Grid
              className={classes.formGrid}
              container
              direction='column'
              spacing={1}
            >
              <h1 className={classes.font}>Create an account</h1>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    aria-label='username'
                    label='Username'
                    name='username'
                    type='text'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    label='E-mail address'
                    aria-label='e-mail address'
                    type='email'
                    name='email'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  fullWidth
                >
                  <TextField
                    aria-label='password'
                    label='Password'
                    type='password'
                    inputProps={{ minLength: 6 }}
                    name='password'
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  fullWidth
                >
                  <TextField
                    label='Confirm Password'
                    aria-label='confirm password'
                    type='password'
                    inputProps={{ minLength: 6 }}
                    name='confirmPassword'
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  color='primary'
                  type='submit'
                  variant='contained'
                  size='large'
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
