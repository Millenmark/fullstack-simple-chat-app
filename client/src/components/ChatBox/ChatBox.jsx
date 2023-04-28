import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import ChatHeader from "../ChatHeader/ChatHeader"

import style from './ChatBox.module.css'

const ChatBox = () => {
  const {user} = useContext(AuthContext)
  const {currentChat, messages, isMessagesLoading} = useContext(ChatContext)
  const {recipientUser} = useFetchRecipientUser(currentChat, user)

  // console.log(messages);
  // console.log(currentChat);
  // console.log(user);
  // console.log(recipientUser);

  if(!recipientUser) {
    return (<ChatHeader text={'Select a conversation'}/>)
  } 

  if(isMessagesLoading) return (<ChatHeader text={'Loading... Please wait.'}/>)

  return (
    <>
      <ChatHeader text={recipientUser?.name}/>
      <div className={style.chatBox}>
        <div className={style.chatboxBody}>
        {
          !messages || messages.length === 0 ? (
            <p>No conversation yet</p>
          ) : (
            messages.map((message, index) => (
              <p key={index}>{message.text}</p>
            ))
          )
        }
        </div>
      </div>
    </>
  )
}

export default ChatBox