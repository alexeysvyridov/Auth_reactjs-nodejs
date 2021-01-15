import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [registerUsername, setregisterUsername] = useState('');
  const [registerPassword, setregisterPassword] = useState('');
  const [loginUsername, setloginUsername] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [data, setData] = useState([]);
  const [hasAccount, setHasAccount] = useState(true);
  const [isSuccessRegister, setIsSuccessRegister] = useState(null);
  const register = (e) => {
    e.preventDefault()
    axios({
      method:'POST',
      url: 'http://localhost:4000/register',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials:true
    }).then(res => {
      if(res.status === 200) {
        setIsSuccessRegister(res.data);
      }
      console.log(res);
    }).catch(err => {
      console.log(err);
      setIsSuccessRegister(false);
    })
  };

  const login = (e) => {
    e.preventDefault()
    axios({
      method:'POST',
      url: 'http://localhost:4000/login',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials:true
    }).then(res => console.log(res))
  };

  const getUser = () => {
    axios({
      method:'GET',
      url: 'http://localhost:4000/user',
      withCredentials:true
    }).then(res => {
      console.log(res);
      setData(res.data)
    })
  };
  const onSubmit = (e) => {
    e.preventDefault()
  }
  let isRegister = "register";
  if(isSuccessRegister) {
    isRegister += " success"
  } else if(isSuccessRegister === false) {
    isRegister += " exist"
  }

  return (
    <div className="App">
      <form className="container" onSubmit={onSubmit}>
    <div className="col">
      {
        hasAccount ? (
          <>
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={(e) => { setloginUsername(e.target.value) }}/>
            <input type="password" placeholder="password" onChange={(e) =>  { setloginPassword(e.target.value) }}/>
            <button onClick={login}>Submit</button>
          </>
 
        ) : (
          <>
            <h1>Register</h1>
            <input type="text" placeholder="username" onChange={(e) => { setregisterUsername(e.target.value) }}/>
            <input type="password" placeholder="password" onChange={(e) => { setregisterPassword(e.target.value) }}/>
            <button onClick={register}>Submit</button>
          </>
        )
      }
        <p className="question"> You don't have an account? &nbsp; 
        {
          hasAccount ? 
          ( <span className="registerLogin" onClick={() => setHasAccount(false)}>Register account</span> ) :
          ( <span className="registerLogin" onClick={() => setHasAccount(true)}> login</span> )
        }
        </p>
        <p className={isRegister}>
        {
          isSuccessRegister ? <span>Account was created Successfuly!</span> :
         <span>User with this name already exist!</span> }
        </p>
      </div>
        {/* <div>
          <h1>Get user</h1>
          <button onClick={getUser} >Submit</button>
          {
            data ? <h1>Wellcome {data.username}</h1>: null
          }
        </div> */}
      </form>
    </div>
  );
}

export default App;
