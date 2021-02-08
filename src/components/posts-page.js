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

const PostsPage = ({posts,setPosts,isLoggedIn,token,refreshUser}) => {

  return (
    <>
      <h1>Items for Sale</h1>
      <div id="posts-container">
        {
          posts.map((post) => {
            return (post.active ? (
                <SinglePost key={post._id} post={post} setPosts={setPosts} token={token} refreshUser={refreshUser}/>
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
