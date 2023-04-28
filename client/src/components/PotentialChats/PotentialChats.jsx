import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import style from './PotentialChats.module.css'

const PotentialChats = () => {
  const { potentialChats } = useContext(ChatContext)
  return (
    <div>
      <div className={style.allUsers}>
        <h4>Available for chats</h4>
        {
          potentialChats && potentialChats.map((user, index) => (
            <div className={style.singleUser} key={index}>
              {user.name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PotentialChats