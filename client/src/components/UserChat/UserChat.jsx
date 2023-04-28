import style from "./UserChat.module.css"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import avatarMale from "../../assets/avatar_male.svg"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"

const UserChat = ({chat, user}) => {
  const {recipientUser} = useFetchRecipientUser(chat,user)
  const { onlineUsers } = useContext(ChatContext)

  const isOnline = onlineUsers?.some(user => user?.userId === recipientUser?._id)

  return (
    <div className={style.userChatsWrapper}>
      <div className={style.userRecipient}>
        <img src={avatarMale} alt="" />
        <div className={style.details}>
          <h4 style={{fontWeight: "600"}}>{recipientUser?.name}</h4>
          <p>Messages shows here</p>
        </div>
      </div>

      <div className={style.dateWrapper}>
        <div className={style.date}>12/12/2022</div>
        <div className={style.notification}>New</div>
      </div>

      <div className={ isOnline ? style.online : style.offline}></div>
    </div>
  )
}

export default UserChat