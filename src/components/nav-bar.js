import {React} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';

const NavBar = () => {
  const currentPath = useLocation().pathname;

  return (
    <nav>
      {currentPath !== '/profile' ? <Link className="nav-link" to="/profile">Profile</Link> : null}
      {currentPath !== '/posts' ? <Link className="nav-link" to="/posts">Posts</Link> : null}
    </nav>
  )
}

export default NavBar;
