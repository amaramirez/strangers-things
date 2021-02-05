import {React,useState,useEffect} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';


const UserPage = ({user,setToken}) => {
  return (
    <Switch>
    <Route path='/profile'>
      <h1>Profile!</h1>
    </Route>

    <Route path='/messages'>
      <h1>Messages!</h1>
    </Route>

    <Route path="/">
      <h2>Welcome back!</h2>
    </Route>
    </Switch>
  )
}

export default UserPage;
