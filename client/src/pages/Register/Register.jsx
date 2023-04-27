import style from './Register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../../UI'

const Register = () => {

  const toastConfig = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark"
  }


  return (
    <>
      <div className={style.formContainer}>
        <form className={style.form}>
          <h2>Register</h2>
          <div className={style.formWrapper}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="Enter your Name" 
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
            <Button 
              type={'submit'}
              bgColor={'primary'}
              className={style.formButton}
            >Register</Button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Register