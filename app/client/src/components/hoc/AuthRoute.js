import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
  const { isLoggedIn, type } = props;
  if(type === 'guest' && isLoggedIn) return <Redirect to="/home"/>
  else if(type === 'private' && !isLoggedIn) return <Redirect to="/login" />
  
  return <Route {...props} />
}
const mapStateToProps = ({isLoggedIn}) => {
  return {isLoggedIn}
}
export  default connect(mapStateToProps)(AuthRoute);