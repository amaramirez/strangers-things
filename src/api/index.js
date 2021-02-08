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
  try {
    const data = await getUser(token);

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

const getUser = async (token) => {
  const test_url = `${BASE_URL}/users/me`;

  try {
    const rsp = await fetch(test_url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await rsp.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

const logOut = () => {
  clearCurrentToken();
  clearCurrentUser();
}

const fetchPosts = async (token = null) => {
  const post_url = `${BASE_URL}/posts`;

  try {
    const rsp = await (!token ? fetch(post_url) : (fetch(post_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })));

    const data = await rsp.json();

    if (data.success) {
      return data.data;
    }

    return [];

  } catch (err) {
    console.error(err);
  }
}

const sendPost = async (token,title,price,location,willDeliver,description) => {
  const post_url = `${BASE_URL}/posts`;

  const post_data = {
    title: title,
    price: price,
    willDeliver: willDeliver,
    description: description
  }

  if (location) post_data.location = location;

  try {
    const rsp = await fetch(post_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: post_data
      })
    })

    const data = await rsp.json();

    return data.success;
  } catch (err) {
    console.error(err);
  }
}

const deletePost = async (postID, token) => {
  const post_url = `${BASE_URL}/posts/${postID}`;

  try {
    const rsp = await fetch(post_url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await rsp.json();

    return data.success;
  } catch (err) {
    console.error(err);
  }
}

const sendMessage = async (postID,_content, token) => {
  try {
    const rsp = await fetch(`${BASE_URL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content: _content
        }
      })
    })

    const data = await rsp.json();

    return data.success;
  } catch (err) {
    console.error(err);
  }
}

export {tryAccess,logIn,logOut,fetchPosts,sendPost,deletePost,sendMessage,getUser};
