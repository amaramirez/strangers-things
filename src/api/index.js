import {
  setCurrentUser,
  clearCurrentUser,
  setCurrentToken,
  clearCurrentToken
} from '../auth';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT';

const tryAccess = async (userName,userPass,doRegister = false) => {
  const access_url = `${BASE_URL}/users/${doRegister ? 'register' : 'login'}`;

  try {
    const rsp = await fetch(access_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userName,
          password: userPass
        }
      })
    })

    const data = await rsp.json();

    return data;

  } catch (err) {
    console.error(err);
  }
}

const logIn = async (token) => {
  const test_url = `${BASE_URL}/users/me`;

  try {
    const rsp = await fetch(test_url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await rsp.json();

    if (data.success) {
      setCurrentToken(token);
      setCurrentUser(data.data);

      return data.data;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
}

const logOut = () => {
  clearCurrentToken();
  clearCurrentUser();
}

const fetchPosts = async () => {
  const post_url = `${BASE_URL}/posts`;

  try {
    const rsp = await fetch(post_url);
    const data = await rsp.json();

    if (data.success) {
      return data.data;
    }

    return null;

  } catch (err) {
    console.error(err);
  }
}

export {tryAccess,logIn,logOut,fetchPosts};
