import { useContext } from 'react'
import style from './Register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../../UI'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {

  const {registerInfo, updateRegisterInfo} = useContext(AuthContext)

  const toastConfig = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(handleValidation()) {
      console.log('Success lodi');
    }
  }

  const handleValidation = () => {
    const {name, email, password} = registerInfo
    
    if(!name.trim() && !email.trim() && !password.trim()) {
      toast.error("All fields are required", toastConfig)
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