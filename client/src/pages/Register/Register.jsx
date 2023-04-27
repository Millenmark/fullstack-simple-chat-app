import style from './Register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  return (
    <div className={style.formContainer}>
      <form className={style.form}>
        <h2>Register</h2>
        <div className={style.formWrapper}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username"
              placeholder="Enter your Username" 
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              placeholder="Enter your email" 
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              placeholder="Enter your password" 
            />
          </div>
        </div>
        
      </form>
    </div>
  )
}

export default Register