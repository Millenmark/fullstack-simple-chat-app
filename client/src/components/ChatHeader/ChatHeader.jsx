import style from './ChatHeader.module.css'

const ChatHeader = ({text}) => {
  return (
    <div className={style.chatHeader}>
      {/* <img src="" alt="" /> */}
      <p>{text}</p>
    </div>
  )
}

export default ChatHeader