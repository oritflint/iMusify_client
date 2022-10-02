
import axios from 'axios';
import { useRef } from 'react';


export default function Login({setIsLogged,setCurrUser}){

  const baseURL = "https://imusify-server.herokuapp.com";
  const email=useRef()
    const password=useRef()

    const submitForm=(e)=>{
      debugger
        e.preventDefault()
        const response = axios.post(`${baseURL}/api/users/login/`,{
            email: email.current.value,
            password: password.current.value
        })
        .then(({data}) => {
            console.log("userData:", data)

            localStorage.token = data.token
            localStorage.user = data.userDetails

            setIsLogged(localStorage.token)
            setCurrUser(data.userDetails.firstname)
        })
        .catch((err)=> console.log(err))
}

return(
  <>
    <div id="main-container" className="d-grid h-100">
      <h1 className="mb-3 fs-3 fw-normal">Please sign in</h1>
      <form id="sign-in-form" onSubmit={submitForm} className="text-center p-3 w-100">
        <input type="email" id="txtEmail" ref={email} placeholder="enter email" className="position-relative" />
        <input type="password" id="txtPass" ref={password} placeholder="enterPassword" className="position-relative" />
        <span  className="d-flex justify-content-center mb-4"><input type="checkbox" id="cbRme"></input><label>Remember me</label></span>
        <input type="submit" value="Sign In" />
    </form>

    </div></>
    )
}
