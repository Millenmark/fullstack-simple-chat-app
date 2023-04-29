import style from './Notification.module.css'
import messageNotification from '../../assets/icon_message_notification.svg'
import { useState, useContext} from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { unreadNotificationsFunc } from '../../utils/unreadNotifications'
import moment from "moment"

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useContext(AuthContext)
  const { notifications, userChats, allUsers, markAllAsRead, markAsRead} = useContext(ChatContext)

  const unreadNotifications = unreadNotificationsFunc(notifications)
  const modifiedNotifications = notifications?.map((n) => {
    const sender = allUsers.find(user => user._id === n.senderId)

    return {
      ...n,
      senderName: sender?.name
    }
  })

  // console.log("Unread: " , unreadNotifications)
  // console.log("Modified: ", modifiedNotifications)


  return (
    <div className={style.notification}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={messageNotification} alt="" />
        {
          unreadNotifications?.length === 0 ? null : (
            <span className={style.notificationCount}>{unreadNotifications?.length}</span>
          )
        }
        
      </button>

      {
        isOpen && (
          <div className={style.notificationBox}>
            <div className={style.notificationBoxHeader}>
              <div>Notifications</div>
              <button type='button' onClick={() => markAllAsRead(notifications)}>Mark all as read</button>
            </div>
            <div className={style.notificationBoxBody}>
              {
                modifiedNotifications?.length === 0 ? (
                  <p>No notifications.</p>
                ) : null
              }
              {
                modifiedNotifications && modifiedNotifications.map((n, index) => {
                  return (
                    <>
                      {
                        !n.isRead && n.senderName && (
                          <div 
                            key={index} 
                            className={style.notificationItem}
                            onClick={() => {
                              markAsRead(n, userChats, user, notifications)
                              setIsOpen(false)
                              }
                            }
                          >
                            <span><strong>{n.senderName}</strong> sent you a new message</span>
                            <span>{moment(n.date).calendar()}</span>
                          </div>
                        )
                      }
                    </>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Notification