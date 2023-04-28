import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { Container, Button } from '../../UI'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const {user, logout} = useContext(AuthContext)

  return (
    <div className={style.navbar}>
      <Container className={style.navcontainer}>
        <h1><Link to="/">JustChat</Link></h1>
        <ul>
          {
            user 
            ? (
              <>
              <li><Button bgColor={'danger'} onClick={() => logout()}>Logout</Button></li>
              <li><Link to="#">{user?.name}</Link></li>
              </>
            ) 
            : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </> 
            )
          }
          
        </ul>
      </Container>
    </div>
  )
}

export default Navbar