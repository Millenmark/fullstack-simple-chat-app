import { useState } from 'react'
import style from './Register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../../UI'

const Register = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const toastConfig = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark"
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if(handleValidation()) {
      const { username, email, password } = values
      // const { data } = await axios.post(registerRoute, {
      //   username,
      //   email,
      //   password,
      // })
    }
  }

  function handleValidation() {
    const { name, email, password } = values
  
    if (!name.trim() && !email.trim() && !password.trim()) {
      toast.error("All fields are required.", toastConfig)
      return false
    } else if (password.trim().length < 8) {
      toast.error("Password should be at least 8 characters long.", toastConfig)
      return false
    }  else if (email.trim() === "") {
      toast.error("Email is required.", toastConfig)
      return false
    } else if (name.trim().length < 3) {
      toast.error("Name should be longer than 3 characters.", toastConfig)
      return false
    }
  
    return true
  }
  
  

  function handleChange(e) {
    setValues((prev) => {
      return {...prev, [e.target.name]:e.target.value}
    })
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
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
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