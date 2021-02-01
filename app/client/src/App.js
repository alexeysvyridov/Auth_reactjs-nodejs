import React, {useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Home from './components/Home/Home';
import AuthRoute from './components/hoc/AuthRoute';
function App() {
  const [hasAccount, setHasAccount] = useState(true);
  const [isSuccessRegister, setIsSuccessRegister] = useState(null);
  const [hasError, setHasError] = useState(false)
 

  let isRegister = "register";
  if(isSuccessRegister) {
    isRegister += " success"
  } else if(isSuccessRegister === false) {
    isRegister += " exist"
  }

  return (
    <Router>
      <div className="App">
          <div className="container">
            <Switch>
              <AuthRoute path="/login" type="guest">
                <Login/>
              </AuthRoute>
              <AuthRoute path="/home" render={Home} type="private" />
              <AuthRoute path="/register">
                <Register/>
              </AuthRoute>
              <Redirect from="*" to="/login" />
            </Switch>
          <p className={isRegister}>
            {
                isSuccessRegister ? <span>Account was created Successfuly!</span> :
              <span>User with this name already exist!</span> 
            }
          </p>
          </div>
      </div>
    </Router>
  );
}

export default App;
