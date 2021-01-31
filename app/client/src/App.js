import React, {useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
function App() {
  const [data, setData] = useState([]);
  const [hasAccount, setHasAccount] = useState(true);
  const [isSuccessRegister, setIsSuccessRegister] = useState(null);
  const [hasError, setHasError] = useState(false)


  const getUser = () => {
    axios({
      method:'GET',
      url: 'http://localhost:4000/user',
      withCredentials:true
    }).then(res => {
      setData(res.data)
    })
  };

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
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register}/>
                <Route render={() => <Redirect to="/login" />} />
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
