import axios from 'axios';
import { gotUser, setFetchingStatus } from '../user';

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('test-token');
  config.headers['x-access-token'] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/auth/user');
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    await localStorage.setItem('test-token', data.token);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    await localStorage.setItem('test-token', data.token);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete('/auth/logout');
    await localStorage.removeItem('test-token');
    dispatch(gotUser({}));
  } catch (error) {
    console.error(error);
  }
};
