import {React} from 'react';

const ProfilePage = ({user,token}) => {
  console.log(user.messages);
  return (
    <>
    <h1>Messages</h1>
    <div id="messages-container">
      {
        user.messages.map((message) => (
          <p>{message.fromUser.username}</p>
        ))
      }
    </div>
    </>
  )
}

export default ProfilePage;
