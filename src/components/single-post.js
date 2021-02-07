import {React} from 'react';
import {deletePost,fetchPosts} from '../api';

const SinglePost = ({post,setPosts,token=null}) => {
  const {active,_id,title,description,createdAt,updatedAt,location,willDeliver,author,price,isAuthor} = post;

  return (
    <>
    <div className="listed-post">
      <h2>{title} - {!isNaN(price[0]) ? "$" : null}{price}</h2>
      <h4>{author.username} - {location} - {willDeliver ? "Will" : "Won't"} Deliver</h4>
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
            <button>Message</button>
          )
        ) : null
      }
    </div>
    <hr />
    </>
  )
}

export default SinglePost;
