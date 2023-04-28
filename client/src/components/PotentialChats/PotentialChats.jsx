import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"

const PotentialChats = () => {
  const { potentialChats } = useContext(ChatContext)
  console.log("Potential Chats", potentialChats)
  return (
    <div>PotentialChats</div>
  )
}

export default PotentialChats