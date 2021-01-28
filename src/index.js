import {React,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const App = () => {
  return (
    <>
      <h1>Hello, World!</h1>
    </>
  )
}

const root = document.getElementById('root');
ReactDOM.render((
  <Router>
    <App />
  </Router>
),root)
