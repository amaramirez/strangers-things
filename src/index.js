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
  NavBar,
  HomePage,
  PostsPage
} from './components';

import {
  getCurrentUser,
  getCurrentToken
} from './auth';

import {
  logIn,
  logOut,
  fetchPosts
} from './api';

const App = () => {
  const [token, setToken] = useState(getCurrentToken());
  const [user, setUser] = useState(getCurrentUser());
  const isLoggedIn = user ? true : false;
  const currentPath = useLocation().pathname;
  const history = useHistory();
  const username = user ? user.username : "Guest";

  console.log(user);

  useEffect (async () => {
    if (token && !user) {
      try {
        const user = await logIn(token);
        setUser(user);
        //setIsLoggedIn(true);
        history.push('/profile');
      } catch (err) {
        console.error(err);
      }

    } else if (!token && user){
      logOut();
      setUser(null);
      //setIsLoggedIn(false);
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
        } to={currentPath}>Log Out</Link>
        ) : null}
        </h2>

        <NavBar />

      </header>

      <main>
        <Switch>
          <Route path="/posts">
            <PostsPage isLoggedIn={isLoggedIn} />
          </Route>

          <Route path="/profile">
            {
              isLoggedIn ? <h1>Messages!</h1> : <AccountForm setToken={setToken} />
            }
          </Route>

          <Route path="/">
            <HomePage isLoggedIn={isLoggedIn} />
          </Route>

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
