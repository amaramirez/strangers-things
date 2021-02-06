import {React} from 'react';

const SinglePost = (post) => {
  const {active,_id,title,description,createdAt,updatedAt,location,willDeliver,author,price,isAuthor} = post.post;

  return (
    <div className="listed-post">
      <h2>{title} - {!isNaN(price[0]) ? "$" : null}{price}</h2>
      <h4>{author.username} - {location} - {willDeliver ? "Will" : "Won't"} Deliver</h4>
      <h4>Posted: {createdAt}<br /> Updated: {updatedAt}</h4>
      <h3>{description}</h3>
    </div>
  )
}

export default SinglePost;
