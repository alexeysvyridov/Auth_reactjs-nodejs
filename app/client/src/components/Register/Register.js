import React, {useState} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {register} from '../../actions';
const Register = ({hasError, register}) => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const submit = (e) => {
    e.preventDefault()
    register({username:registerUsername, password:registerPassword})
  }
  return (
    <form className="col" onSubmit={submit}>
      <h1>Register</h1>
      <input 
      type="text" 
      value={registerUsername} 
      placeholder="username" 
      onChange={(e) => { setRegisterUsername(e.target.value) }}
      required={true}
      />
      <input 
      type="password" 
      value={registerPassword} 
      placeholder="password" 
      onChange={(e) => { setRegisterPassword(e.target.value) }}
      required={true}
      />
      <p className="block-message">
        <span className={hasError ? "showMessage": "noErrors"}>User or password incorrect!</span>
      </p>
      <input type="submit" value="Submit"/>
      <Link to="/login">
        <p className="question">
          <span>I have an account!&nbsp;</span>
          <span className="registerLogin"> back to login</span> 
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
export default connect(mapStateToProps,{register})(Register);
