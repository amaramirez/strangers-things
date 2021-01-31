import {React,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const AccountForm = ({registerForm = false}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passmatch, setPassmatch] = useState('');
  const pageText = registerForm ? 'Register' : 'Log In';

  return (
    <>
    <h2>{pageText}</h2>
    <form id="account-form" onSubmit={(event) => {
      event.preventDefault();
      console.log("User: ", username, "\nPassword: ",password);
    }}>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter Username" required={true} minLength="8"></input>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter Password" required={true} minLength="8"></input>

      {
        registerForm ?
        (<input type="password" value={passmatch} onChange={(event) => setPassmatch(event.target.value)} placeholder="Enter Password Again" required={true}></input>) :
        null
      }
      <button type="submit" disabled={!username ||
                                      !password ||
                                      (password !== passmatch && registerForm)}>{pageText}</button>
      <span id="account-error">{(passmatch !== password && registerForm) ? "Passwords must match." : null}</span>
      <Link to={registerForm ? '/login' : '/register'}>{registerForm ? (
        "Already have an account? Click to Log In."
      ) : (
        "Need an account? Click to Register."
      )}</Link>
    </form>
    </>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1>Stranger's Things</h1>
      <nav>
        {
          isLoggedIn ? (
            <Link to="/logout">Log Out</Link>
          ) : (
            document.location.pathname === ('/login' || '/register') ? (
              <Link to="/login">Register/Log In</Link>
            ) : null
          )
        }

      </nav>
      <Route path="/login">
        <AccountForm/>
      </Route>
      <Route path="/register">
        <AccountForm registerForm={true} />
      </Route>
    </>
  )
}

const root = document.getElementById('root');
ReactDOM.render((
  <Router>
    <App />
  </Router>
),root)
