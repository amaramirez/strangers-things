import {React} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';

const NavBar = ({isLoggedIn}) => {
  const currentPath = useLocation().pathname;

  return (
    <nav>
      {currentPath !== '/' ? <Link id="nav-link" to="/">Home</Link> : null}
      {currentPath !== '/posts' ? <Link id="nav-link" to="/posts">Posts</Link> : null}
      {
        currentPath !== '/profile' &&
        currentPath !== '/login' &&
        currentPath !== '/register' ? <Link id="nav-link" to={isLoggedIn ? "/profile" : "/login"}>Profile</Link> : null
      }
    </nav>
  )
}

export default NavBar;
