import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Chat, Login, Register } from './pages'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </>
  )
}

export default App
