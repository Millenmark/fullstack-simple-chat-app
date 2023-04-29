import style from './Notification.module.css'
import messageNotification from '../../assets/icon_message_notification.svg'

const Notification = () => {
  return (
    <div className={style.notification}>
      <div>
        <img src={messageNotification} alt="" />
      </div>
    </div>
  )
}

export default Notification