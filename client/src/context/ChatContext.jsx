import { createContext, useCallback, useEffect, useState } from "react"
import { getRequest, baseUrl, postRequest } from "../utils/services"
import { io } from "socket.io-client"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null)
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [userChatsError, setUserChatsError] = useState(null)
  const [potentialChats, setPotentialChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  const [messages, setMessages] = useState(null)
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [messagesError, setMessagesError] = useState(null)

  const [sendTextMessageError, setSendTextMessageError] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  const [notifications, setNotifications] = useState([])
  
  // console.log(allUsers);
  // console.log(notifications);
  // console.log(onlineUsers)
  // console.log(socket);
  // console.log(currentChat?._id);
  // console.log(messages);

  /* Initialize socket */
  useEffect(() => {
    const newSocket = io("http://localhost:5000")
    setSocket(newSocket)

    //clean up function
    return () => {
      newSocket.disconnect()
    }
  }, [user])


  //adding online users
  useEffect(() => {
    if(socket === null) return
    socket.emit("addNewUser", user?._id)
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res)
    })

    return () => {
      socket.off("getOnlineUsers")
    }
  }, [socket, user?._id])

  // sending messages
  // console.log(newMessage)
  useEffect(() => {
    if(socket === null) return

    const recipientId = currentChat?.members?.find((id) => id !== user?._id)
    
    socket.emit("sendMessage", {...newMessage, recipientId })
  }, [newMessage, user?._id, currentChat, socket])

  //receive message and notification
  //console.log(messages)
  useEffect(() => {
    if(socket === null) return

    socket.on("getMessage", (res) => {
      if(currentChat?._id !==  res.chatId) return
      setMessages((prev) => [...prev, res])
    })

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some(id => id === res.senderId)

      if (isChatOpen) {
        setNotifications((prev) => [{...res, isRead: true}, ...prev])
      } else {
        setNotifications((prev) => [res, ...prev])
      }
    })

    return () => {
      socket.off("getMessage")
      socket.off("getNotification")
    }

  }, [socket, currentChat])

  // console.log(messages)

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true)
      setMessagesError(null)
      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)
      setIsMessagesLoading(false)

      if(response.error){
        return setMessagesError(response)
      }

      setMessages(response)
      
    }

    getMessages()
  }, [currentChat?._id])

  

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`)

      if (response.error) {
        return console.log("Error fetching users", response)
      }

      const chats = response.filter((u) => {
        let isChatCreated = false
        if (user?._id === u._id) return false

        if(userChats){
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id
          })
        }

        return !isChatCreated
      })

      setPotentialChats(chats)
      setAllUsers(response)
    }

    getUsers()
  }, [user?._id, userChats])

  useEffect(() => {
    const getUserChats = async () => {
      if(user?._id){
        setIsUserChatsLoading(true)
        setUserChatsError(null)
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`)
        setIsUserChatsLoading(false)

        if(response.error){
          return setUserChatsError(response)
        }

        setUserChats(response)
      }
    }

    getUserChats()
  }, [user])

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat)
  }, [])

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({firstId, secondId}))

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response])
  }, [])

  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
    if(!textMessage) return console.log("You must type something!")

    const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
      chatId: currentChatId,
      senderId: sender._id,
      text: textMessage
      })
    )

    if(response.error){
      return setSendTextMessageError(response)
    }

    setNewMessage(response)
    setMessages((prev) => [...prev, response])
    setTextMessage("")

  }, []);
  

  //Mark all as read function
  const markAllAsRead = useCallback((notifications) => {
    const modNotifications  = notifications.map(n => {return {...n, isRead: true}})

    setNotifications(modNotifications)
  }, [])


  //Opening the chatbox in notification
  const markAsRead = useCallback((n, userChats, user, notifications) => {
    const desiredChat = userChats.find(chat => {
      const chatMembers = [user._id, n.senderId]
      const isDesiredChat = chat?.members.every(member => {
        return chatMembers.includes(member)
      })

      return isDesiredChat
    })

    //mark now as read
    const modNofications = notifications.map(item => {
      if (n.senderId === item.senderId){
        return {...n, isRead: true}
      } else {
        return item
      }
    })

    updateCurrentChat(desiredChat)
    setNotifications(modNofications)
  })

  const markThisAsRead = useCallback((thisUserNotifications, notifications) => {
    const modNotifications = notifications.map(item => {
      let notification;

      thisUserNotifications.forEach(n => {
        if(n.senderId === item.senderId) {
          notification = {...n, isRead: true}
        } else {
          notification = item
        }
      })

      return notification
    })

    setNotifications(modNotifications)
  })


  return (
    <ChatContext.Provider value={{
      userChats,
      isUserChatsLoading,
      userChatsError,
      potentialChats,
      createChat,
      currentChat,
      updateCurrentChat,
      messages,
      isMessagesLoading,
      messagesError,
      sendTextMessage,
      onlineUsers,
      notifications,
      allUsers,
      markAllAsRead,
      markAsRead,
      markThisAsRead
    }}>
      {children}
    </ChatContext.Provider>
  )
}