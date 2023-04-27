import { createContext, useCallback, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { baseUrl, postRequest } from "../utils/services"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [registerError, setRegisterError] = useState(null)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  // console.log('User', user);
  console.log("loginInfo", loginInfo);

  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user));
  }, [])

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info)
  }, [])

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(prevInfo => ({
      ...prevInfo,
      ...info
    }))
  }, [])

  const registerUser =useCallback(async () => {
    setIsRegisterLoading(true)
    setRegisterError(null)

    const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

    setIsRegisterLoading(false)


    if(response.error) {
      return setRegisterError(response)
    }


    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [registerInfo])


  const loginUser = useCallback(async (e) => {
    e.preventDefault()
    
    setIsLoginLoading(true)
    setLoginError(null)

    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    )

    setIsLoginLoading(false)

    if(response.error){
      return setLoginError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)

  }, [loginInfo])

  const logout = useCallback(() => {
    localStorage.removeItem('User')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider 
      value = {{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginUser,
        updateLoginInfo,
        loginError,
        isLoginLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};