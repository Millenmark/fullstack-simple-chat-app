import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { Container } from "../../UI";
import { UserChat } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import style from "./Chat.module.css"

const Chat = () => {

  const { user } = useContext(AuthContext)

  const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext)

  // console.log("UserChats", userChats);

  return (
    <Container>
      {
        userChats?.length < 1 ? null : (
          <div className={style.chatboxContainer}>
            <div>
              {isUserChatsLoading && <p>Loading chats...</p>}
              <ul>
                {
                  userChats?.map((chat, index) => (
                    <li key={index}>
                      <UserChat chat={chat} user={user}/>
                    </li>
                  ))
                }
              </ul>
            </div>
            <p>Chatbox</p>
          </div>
        )
      }
    </Container>
  )
}

export default Chat