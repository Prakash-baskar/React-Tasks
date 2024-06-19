import React, { useState } from 'react'
import "./Login.css"
const RegisterForm = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCPassword] = useState("")

  return (
    <div>
      <div className='Regform'>
        <form className='Regmain'>
            <div className='register'><h2>Rgister Form</h2></div>
            <div>
                <label>UserName</label>
                <input className='Regin' placeholder='UserName'></input>
            </div>
            <div>
                <label>Email</label>
                <input className='Regin' placeholder='Email'></input>
            </div>
            <div>
                <label>Mobile Number</label>
                <input className='Regin' placeholder='MobileNumber'></input>
            </div>
            <div>
                <label>Password</label>
                <input className='Regin' placeholder='Enter Password'></input>
            </div>
            <div>
                <label>Confirm Password</label>
                <input className='Regin' placeholder='Confirm Your Password'></input>
            </div>
            <div>
                <label>UserRole</label>
                <input className='Regin' placeholder='UserRole'></input>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
