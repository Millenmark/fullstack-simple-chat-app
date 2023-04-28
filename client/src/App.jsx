import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Chat, Login, Register } from './pages'
import { Container } from './UI'
import { Navbar } from './components'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

function App() {
  const {user} = useContext(AuthContext)

  return (
    <ChatContextProvider user = { user }>
      <Navbar/>
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat/> : <Login/>}/>
          <Route path="/register" element={user ? <Chat/> : <Register/>}/>
          <Route path="/login" element={user ? <Chat/> : <Login/>}/>
          <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
      </Container>
    </ChatContextProvider>
    
  )
}

export default App
