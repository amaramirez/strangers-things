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
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState(false);

  useEffect(async () => {
    try {
      const data = await fetchPosts(isLoggedIn, token);

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
                <SinglePost key={post._id} post={post} />
              ) : null
            )
          })
        }
      </div>
      {
        isLoggedIn ? <AddPostForm setNewPost={setNewPost} newPost={newPost}/> : null
      }
    </>
  )
}

export default PostsPage;
