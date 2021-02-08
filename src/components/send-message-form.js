import {React,useState} from 'react';
import {sendMessage} from '../api';

const SendMessageForm = ({id,token,setMsgFormActive}) => {
  const [messageContent, setMessageContent] = useState('');

  return (
    <form id="send-message-form" onSubmit={async (event) => {
      event.preventDefault();

      try {
        const rsp = await sendMessage(id, messageContent, token);

        if (rsp) {
          setMessageContent('');
          setMsgFormActive(false);
        }
      } catch (err) {
        console.error(err);
      }
    }}>
      <input required type="text" placeholder="Enter message here" value={messageContent} onChange={(event) => setMessageContent(event.target.value)} />
      <input type="submit" value="Send" />
    </form>
  )
}

export default SendMessageForm;
