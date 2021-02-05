import {React,useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation
} from 'react-router-dom';
import {
  AccountForm
} from './'

const WelcomePage = ({setToken}) => {
  return (
    <Switch>
      <Route path="/login">
        <AccountForm setToken={setToken}/>
      </Route>

      <Route path="/register">
        <AccountForm registerForm={true} setToken={setToken}/>
      </Route>
      <Route path="/">
        <h2>Welcome to Stranger's Things!</h2>
        <h3>Begin by signing up or logging in!</h3>
      </Route>
    </Switch>
  )
}

export default WelcomePage;
