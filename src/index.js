import {React,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation,
  useHistory
} from 'react-router-dom';

import {
  AccountForm,
  WelcomePage,
  UserPage,
  NavBar
} from './components';

import {
  getCurrentUser,
  getCurrentToken
} from './auth';

import {
  logIn,
  logOut
} from './api';

const App = () => {
  const [token, setToken] = useState(getCurrentToken());
  const [user, setUser] = useState(getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPath = useLocation().pathname;
  const history = useHistory();
  const username = user ? user.username : "Guest";

  console.log(user);

  useEffect (async () => {
    if (token && !user) {
      try {
        const user = await logIn(token);
        setUser(user);
        setIsLoggedIn(true);
        history.push('/profile');
      } catch (err) {
        console.error(err);
      }

    } else if (!token && user){
      logOut();
      setUser(null);
      setIsLoggedIn(false);
    }
  },[token]);

  return (
    <>
      <header>
        <h1>Stranger's Things</h1>
        <h2>Hello, {username}! {isLoggedIn ? (
          <Link id="logOutButton" onClick={() => {
            setToken(null);
          }
          } to="/">Log Out</Link>
        ) : null}
        </h2>

        <NavBar isLoggedIn={isLoggedIn} />

      </header>

      <main>
        <Switch>
          <Route path="/posts">
            <h1>Posts!</h1>
          </Route>
          {
            !isLoggedIn ? <WelcomePage setToken={setToken} /> : <UserPage user={user} setToken={setToken}/>
          }

        </Switch>
      </main>

      <h3>{currentPath}</h3>
    </>
  )
}

const root = document.getElementById('root');
ReactDOM.render((
  <Router>
    <App />
  </Router>
),root)
