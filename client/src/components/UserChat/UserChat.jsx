import style from "./UserChat.module.css"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import avatarMale from "../../assets/avatar_male.svg"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import {unreadNotificationsFunc} from '../../utils/unreadNotifications'
import { userFetchLatestMessage } from "../../hooks/useFetchLatestMessage"
import moment from "moment"

const UserChat = ({chat, user}) => {
  const {recipientUser} = useFetchRecipientUser(chat,user)
  const { onlineUsers, notifications, markThisAsRead } = useContext(ChatContext)

  const { latestMessage } = userFetchLatestMessage(chat)

  const unreadNotifications = unreadNotificationsFunc(notifications)
  const thisUserNotifications = unreadNotifications?.filter(
    n => n.senderId === recipientUser?._id
  )

  const isOnline = onlineUsers?.some(user => user?.userId === recipientUser?._id)

  const truncateText = (text) => {
    let shortText = text.substring(0, 15)

    if(text.length > 15){
      shortText = shortText + "..."
    }

    return shortText
  }

  return (
    <div 
      className={style.userChatsWrapper} 
      onClick={() => {
          if(thisUserNotifications?.length !== 0) {
            markThisAsRead(thisUserNotifications, notifications)
          }
        }
      }
    >
      <div className={style.userRecipient}>
        <img src={avatarMale} alt="" />
        <div className={style.details}>
          <h4 style={{fontWeight: "600"}}>{recipientUser?.name}</h4>
            {
              latestMessage?.text ? (
                <p>{truncateText(latestMessage?.text)}</p>
              ) : (
                <p>No conversation yet</p>
              )
            }
        </div>
      </div>

      <div className={style.dateWrapper}>
        <div className={style.date}>{moment(latestMessage?.createdAt).format("MM/DD/YYYY")}</div>
        {
          thisUserNotifications?.length > 0 ? (
            <div className={style.notification}>New</div>
          ) : null
        }
      </div>

      <div className={ isOnline ? style.online : style.offline}></div>
    </div>
  )
}

export default UserChat