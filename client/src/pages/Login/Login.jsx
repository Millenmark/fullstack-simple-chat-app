import style from './Login.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../../UI'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const {loginUser, loginInfo, updateLoginInfo, loginError, isLoginLoading} = useContext(AuthContext)

  const toastConfig = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(handleValidation()) {
      loginUser()
    }
  }

  const handleValidation = () => {
    const {email, password} = loginInfo

    if(!email.trim() && !password.trim()) {
      toast.error('All fields are required', toastConfig)
      return false
    }

    if(loginError !== null) {
      toast.error("Invalid email or password", toastConfig)
      return false
    }

    return true
  }


  return (
    <>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className={style.formWrapper}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Enter your email" 
                onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Enter your password" 
                onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}
              />
            </div>
            <Button 
              type={'submit'}
              bgColor={'primary'}
              className={style.formButton}
            >Login</Button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Login