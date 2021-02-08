import {React,useState} from 'react';
import {deletePost,fetchPosts,sendMessage} from '../api';
import {SendMessageForm} from './'

const SinglePost = ({post,setPosts,token=null}) => {
  const {active,_id,title,description,createdAt,updatedAt,location,willDeliver,author,price,isAuthor} = post;
  const [msgFormActive, setMsgFormActive] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  return (
    <>
    <div className="listed-post">
      <h2>{title} - {!isNaN(price[0]) ? "$" : null}{price}</h2>
      <h4>
        {author.username ? `${author.username} - ` : null}
        {location} - {willDeliver ? "Will" : "Won't"} Deliver
      </h4>
      <h4>Posted: {createdAt}<br /> Updated: {updatedAt}</h4>
      <h3>{description}</h3>
      {
        token ? (
          isAuthor ? (
            <button className="delete-button" onClick={async () => {
              if (confirm('Are you sure you want to delete this post?')) {
                try {
                  const rsp = await deletePost(_id,token);

                  if (rsp) {
                    const data = await fetchPosts(token);

                    setPosts(data.posts);
                  }
                } catch (err) {
                  console.error(err);
                }
              }
            }}>Delete</button>
          ) : (
            <button onClick={() => {
              setMsgFormActive(!msgFormActive);
            }}>{msgFormActive ? "Cancel" : "Message"}</button>
          )
        ) : null
      }

      {
        msgFormActive ? (
          <SendMessageForm token={token} id={_id} setMsgFormActive={setMsgFormActive} />
        ) : null
      }
    </div>
    {isAuthor ? <div className="clearfix">&nbsp;</div> : null}
    <hr />
    </>
  )
}

export default SinglePost;
