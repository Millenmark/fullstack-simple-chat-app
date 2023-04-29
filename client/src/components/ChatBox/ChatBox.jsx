import { useContext, useState, useRef, useEffect } from "react"
import sentIcon from '../../assets/icon_send.svg'
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import moment from "moment"
import InputEmoji from "react-input-emoji"
import ChatHeader from "../ChatHeader/ChatHeader"

import style from './ChatBox.module.css'

const ChatBox = () => {
  const {user} = useContext(AuthContext)
  const {currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext)
  const {recipientUser} = useFetchRecipientUser(currentChat, user)
  const [textMessage, setTextMessage] = useState("")
  const scroll = useRef()

  // console.log(textMessage);
  // console.log(messages);
  // console.log(currentChat);
  // console.log(user);
  // console.log(recipientUser);
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  if(!recipientUser) {
    return (<ChatHeader text={'Select a conversation'}/>)
  } 

  if(isMessagesLoading) return (<ChatHeader text={'Loading... Please wait.'}/>)

  return (
    <>
      <ChatHeader text={recipientUser?.name}/>
      <div className={style.chatBox}>
        <div className={style.chatBoxBody}>
        {
          !messages || messages.length === 0 ? (
            <p>No conversation yet</p>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`${message?.senderId === user?._id ? style.sentItem : style.messageItem}`}
                ref={scroll}
              >
                <p>{message.text}</p>
                <span>{moment(message.createdAt).calendar()}</span>
              </div>
            ))
          )
        }
        </div>
        <div className={style.chatBoxFooter}>
          <InputEmoji 
            value={textMessage} 
            onChange={setTextMessage}
            fontFamily="Poppins"
            borderRadius={10}
            borderColor="#34495e"
          />
          <button onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
            <img src={sentIcon} alt="" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatBox