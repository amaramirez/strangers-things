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
  PostsPage,
  ProfilePage
} from './components';

import {
  getCurrentUser,
  getCurrentToken,
  setCurrentUser
} from './auth';

import {
  logIn,
  logOut,
  fetchPosts,
  getUser
} from './api';

const App = () => {
  const [token, setToken] = useState(getCurrentToken());
  const [user, setUser] = useState(getCurrentUser());
  const [posts, setPosts] = useState([]);
  const isLoggedIn = user ? true : false;
  const currentPath = useLocation().pathname;
  const history = useHistory();
  const username = user ? user.username : "Guest";

  const refreshUser = async () => {
    try {
      const data = await getUser(token);
      setUser(data.data);
      setCurrentUser(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  const refreshPosts = async () => {
    try {
      const data = await fetchPosts(token);

      setPosts(data.posts);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect (async () => {
    if (token && !user) {
      try {
        const user = await logIn(token);
        setUser(user);
      } catch (err) {
        console.error(err);
      }

    } else if (!token && user){
      logOut();
      setUser(null);
    }
    history.push(currentPath);
  },[token]);

  useEffect(async () => {
    try {
      const postData = await refreshPosts();
      const userData = await (isLoggedIn ? refreshUser() : null);
    } catch(err) {
      console.error(err);
    }

  },[])


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
            <PostsPage posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} token={token} />
          </Route>

          <Route path="/profile">
            {
              isLoggedIn ? <ProfilePage posts={posts} user={user} token={token} /> : <AccountForm setToken={setToken} />
            }
          </Route>

          <Route path="/">
            <HomePage isLoggedIn={isLoggedIn} />
          </Route>

        </Switch>
      </main>
    </>
  )
}

const root = document.getElementById('root');
ReactDOM.render((
  <Router>
    <App />
  </Router>
),root)
