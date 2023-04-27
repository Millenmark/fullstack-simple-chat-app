import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Chat, Login, Register } from './pages'
import { Container } from './UI'
import { Navbar } from './components'

function App() {

  return (
    <>
      <Navbar/>
      <Container>
        <Routes>
          <Route path="/" element={<Chat/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
      </Container>
    </>
    
  )
}

export default App
