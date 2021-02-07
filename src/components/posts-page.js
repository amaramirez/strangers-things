import {
  React,
  useState,
  useEffect
} from 'react';

import {
  fetchPosts
} from '../api'

import {
  SinglePost,
  AddPostForm
} from './'

const PostsPage = ({isLoggedIn,token}) => {
  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(async () => {
    try {
      const data = await fetchPosts(token);

      setPosts(data.posts);

    } catch (err) {
      console.error(err);
    }
  },[])

  return (
    <>
      <h1>Items for Sale</h1>
      <div id="posts-container">
        {
          posts.map((post) => {
            return (post.active ? (
                <SinglePost key={post._id} post={post} setPosts={setPosts} token={token}/>
              ) : null
            )
          })
        }
        <h3>That's all for now!</h3>
      </div>
      {
        isLoggedIn ? <AddPostForm setPosts={setPosts} token={token}/> : null
      }
    </>
  )
}

export default PostsPage;
