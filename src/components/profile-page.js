import {React,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {SinglePost,SendMessageForm} from './';

const ProfilePage = ({posts,user,token,setPosts}) => {
  const [showPost, setShowPost] = useState({});
  const [activeMessages, setActiveMessages] = useState([]);

  const handleShowComponent = (id, isReply = false) => {
    const nextShowPost = {...showPost};

    if (isReply) {
      nextShowPost[id] = false;
    } else {
      nextShowPost[id] = !showPost[id];
    }

    setShowPost(nextShowPost);
  }

  useEffect(async () => {
    const nextShowPost = {};
    const nextMessages = user.messages.filter((message) => posts.find((post) => {
      return post._id === message.post._id && user.username !== message.fromUser.username;
    }));

    nextMessages.map((message) => {
      nextShowPost[message._id] = false;
    });

    setActiveMessages(nextMessages);
    setShowPost(nextShowPost);
  },[posts,user])

  return (
    <>
      <h1>Messages</h1>
      <div id="posts-container">
        {
          activeMessages.length ? (
            activeMessages.map((message) => {
              const {_id,post,fromUser,content} = message;
              const showThisPost = showPost[_id];
              const fullPost = posts.find((_post) => _post._id === post._id);

              return (
                <div key={_id} className="listed-post">
                  <h3>From {fromUser.username} about {post.title}</h3>
                  <p>{content}</p>

                  <button className="nav-link" onClick={() => {
                    handleShowComponent(_id);
                  }}>{showThisPost ? "Hide Post" : "Show Post"}</button>

                  {
                    showThisPost ? <SinglePost post={fullPost}/> : null
                  }

                </div>
              )
            })
          ) : (<h1>No messages yet!</h1>)

        }
      </div>
    </>
  )
}

export default ProfilePage;
