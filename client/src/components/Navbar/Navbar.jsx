import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { Container } from '../../UI'

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <Container className={style.navcontainer}>
        <h1><Link to="/">JustChat</Link></h1>
        <span>Logged in as Millen</span>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </Container>
    </div>
  )
}

export default Navbar