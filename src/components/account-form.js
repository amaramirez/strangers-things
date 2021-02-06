import {React,useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation
} from 'react-router-dom';
import {tryAccess} from '../api'

const AccountForm = ({setToken}) => {
  const [registerForm, setRegisterFrom] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passmatch, setPassmatch] = useState('');
  const [accessErr, setAccessErr] = useState('');

  return (
    <>
    <h2>{registerForm ? 'Register' : 'Log In'}</h2>
    <form id="account-form" onSubmit={async (event) => {
      event.preventDefault();
      try {
        const rsp = await tryAccess(username,password,registerForm);

        if (rsp.success) {
          setToken(rsp.data.token);
        } else {
          setAccessErr(rsp.error.message);
        }
      } catch (err) {
        console.log(err);
      }
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
                                      (password !== passmatch && registerForm)}>Go</button>
      <section id="account-error">
      {
        (passmatch !== password && registerForm) ? (
          <p>Passwords must match.</p>
        ) : null
      }
      {
        accessErr ? (
          <p>{accessErr}</p>
        ) : null
      }
      </section>
      <Link onClick={() => {
        setAccessErr('');
        setRegisterFrom(!registerForm);
      }} to="#">{registerForm ? (
        "Already have an account? Click to Log In."
      ) : (
        "Need an account? Click to Register."
      )}</Link>
    </form>
    </>
  )
}

export default AccountForm;
