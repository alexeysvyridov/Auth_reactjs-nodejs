import axios from 'axios'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const success = (user) => {
  return {  
    type: LOGIN_SUCCESS,
    payload: user
  }
}
const request = (user) => {
  return {  
    type: LOGIN_REQUEST,
    payload: user
  }
}
const error = (message) => {
  return {  
    type:LOGIN_FAILURE,
    payload: message
  }
}
const successRegister = (user) => {
  return {  
    type: REGISTER_SUCCESS,
    payload: user
  }
}
const requestRegister = (user) => {
  return {  
    type: REGISTER_REQUEST,
    payload: user
  }
}
const errorRegister = (message) => {
  return {  
    type:REGISTER_FAILURE,
    payload: message
  }
}
export const loginUser = (username, password) => async (dispatch) => {
    dispatch(request({username, password}))
    try { 
      let resp = await axios({
      method:'POST',
      url: 'http://localhost:4000/login',
      data: {
        username,
        password,
      },
      withCredentials:true
    }); 
      dispatch(success(resp))
      // clearFields()
      // setHasError(false)
    } catch (message) {
      dispatch(error(message))
    }
  }

  export const register = (username, password) => async (dispatch) => {
    dispatch(requestRegister({username, password}))
    try { 
      let resp = await axios({
      method:'POST',
      url: 'http://localhost:4000/register',
      data: {
        username,
        password,
      },
      withCredentials:true
    }); 
      dispatch(successRegister(resp))
    } catch (message) {
      dispatch(errorRegister(message))
    }
  }