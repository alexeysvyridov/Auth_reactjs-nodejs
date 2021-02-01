import React,{useReducer, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {loginUser, request } from '../../actions';
import {Link} from 'react-router-dom';



const Login = ({hasError, loginUser}) => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const submit = (e) => {
    e.preventDefault()
    loginUser(username, password)
  }
  return (
    <form className="col" onSubmit={submit}>
      <h1>Login</h1>
      <input 
      type="text" 
      value={username}  
      placeholder="username" 
      onChange={(e) => setUsername(e.target.value) }
      required={true}
      />
      <input 
      type="password" 
      value={password} 
      placeholder="password" 
      onChange={(e) => setPassword(e.target.value) }
      required={true}
      />
      <p  className="block-message">
        <span className={hasError ? "showMessage": "noErrors"}>User or password incorrect!</span>
      </p>
      <input type="submit" value="Submit"/>
      <Link to="/register">
        <p className="question">
          <span>You don't have an account? &nbsp;</span>
          <span className="registerLogin">Register account</span>
        </p>
      </Link>
  </form>
  )
}
const mapStateToProps = ({hasError}) => {
  return {
    hasError
  }
}

export default connect(mapStateToProps, { loginUser })(Login);