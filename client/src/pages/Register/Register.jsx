import { useContext } from 'react'
import style from './Register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../../UI'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {

  const {registerInfo, updateRegisterInfo, registerUser, isRegisterLoading} = useContext(AuthContext)

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
      registerUser()
    }
  }

  const handleValidation = () => {
    const { name, email, password } = registerInfo

    if (!name.trim() && !email.trim() && !password.trim()) {
      toast.error("All fields are required", toastConfig)
      return false
    }
  
    if (!name.trim() || name.trim().length < 3) {
      toast.error("Please enter a valid name (minimum 3 characters)", toastConfig)
      return false
    }
  
    const emailParts = email.split("@")
    if (!email.trim() || emailParts.length !== 2 || emailParts[0].length < 1 || emailParts[1].indexOf(".") === -1) {
      toast.error("Please enter a valid email address", toastConfig)
      return false
    }
  
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    if (!password.trim() || password.length < 8 || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      toast.error("Please enter a strong password (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)", toastConfig)
      return false
    }
  
    return true
  }
  

  return (
    <>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className={style.formWrapper}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="Enter your Name" 
                onChange={(e) => updateRegisterInfo({...registerInfo, name: e.target.value})}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Enter your email"
                onChange={(e) => updateRegisterInfo({...registerInfo, email: e.target.value})}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Enter your password"
                onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})}
              />
              <h6 style={{marginTop: ".5rem", fontWeight: "500"}}>
                Your password must have: <br/>
                8 characters<br/>
                Uppercase Letter/s <br/>
                Special characters<br/>
              </h6>
            </div>
            <Button 
              type={'submit'}
              bgColor={'primary'}
              className={style.formButton}
            >
              {
                isRegisterLoading ? "Creating your account..." : "Register"
              }
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Register