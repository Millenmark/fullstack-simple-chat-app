import style from "./UserChat.module.css"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import avatarMale from "../../assets/avatar_male.svg"

const UserChat = ({chat, user}) => {
  const {recipientUser} = useFetchRecipientUser(chat, user)

  return (
    <a href="#" className={style.userChatsWrapper}>
      <div className={style.userRecipient}>
        <img src={avatarMale} alt="" />
        <div className={style.details}>
          <h4 style={{fontWeight: "600"}}>{recipientUser?.name}</h4>
          <p>Messages shows here</p>
        </div>
      </div>

      <div className={style.dateWrapper}>
        <div className={style.date}>12/12/2022</div>
        <div className={style.notification}></div>
      </div>
    </a>
  )
}

export default UserChat