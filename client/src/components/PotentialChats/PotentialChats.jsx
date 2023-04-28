import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import style from './PotentialChats.module.css'
import { AuthContext } from "../../context/AuthContext"

const PotentialChats = () => {
  const {user} = useContext(AuthContext)
  const { potentialChats, createChat} = useContext(ChatContext)
  return (
    <div>
      <div className={style.allUsers}>
        <h4>Available for chats</h4>
        {
          potentialChats && potentialChats.map((u, index) => (
            <div className={style.singleUser} key={index} onClick={() => createChat(user?._id, u._id)}>
              {u.name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PotentialChats