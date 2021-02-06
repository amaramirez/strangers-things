import {
  React,
  useState,
  useEffect
} from 'react';

import {
  fetchPosts
} from '../api'

import {
  SinglePost
} from './'

const PostsPage = ({isLoggedIn}) => {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    try {
      const data = await fetchPosts();

      setPosts(data.posts);

    } catch (err) {
      console.error(err);
    }
  },[])

  return (
    <>
      <h1>Posts!</h1>
      <div id="posts-container">
        {
          posts.map((post) => {
            return (post.active ? (
                <SinglePost key={post._id} post={post} />
              ) : null
            )
          })
        }
      </div>
    </>
  )
}

export default PostsPage;
