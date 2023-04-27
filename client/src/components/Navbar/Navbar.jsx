import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { Container } from '../../UI'

const Navbar = () => {
  return (
    <div>
      <Container>
        <h1><Link to="/">JustChat</Link>
        </h1>
      </Container>
    </div>
  )
}

export default Navbar