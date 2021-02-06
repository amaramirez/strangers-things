import {React} from 'react';

const HomePage = ({isLoggedIn}) => {
  return (
    isLoggedIn ? <h2>Welcome back!</h2> : (
      <>
        <h2>Welcome to Stranger's Things!</h2>
        <h3>Begin by signing up or logging in!</h3>
      </>
    )
  )
}

export default HomePage;
