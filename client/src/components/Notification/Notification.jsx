import style from './Notification.module.css'
import messageNotification from '../../assets/icon_message_notification.svg'
import { useState } from 'react'

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={style.notification}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={messageNotification} alt="" />
      </button>

      {
        isOpen && (
          <div className={style.notificationBox}>
            <div>Notifications</div>
            <div>Mark all as read</div>
          </div>
        )
      }
    </div>
  )
}

export default Notification