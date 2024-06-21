import React, { useState } from 'react';
import "./Login.css";
import loginApi from './Api/LoginApi';
const LoginForm = () => {

  const [loginRegister,setLoginRegister] = useState({
         userName:"",
         password:"",
  })

  const handleChange = (e) =>{
    const {name,value} = e.target
    setLoginRegister({
      ...loginRegister,
      [name]:value
    });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(loginRegister)
    loginApi(loginRegister);
    setLoginRegister({
      userName:"",
      password:"",
    })
  }
  return (
    <div>
      <div className='Regform'>
        <form className='Regmainlg' onSubmit={handleSubmit}>
           <div className='register'><h2>Login Form</h2></div>

            <div>
                <label>UserName</label>
                <input className='Regin' placeholder='username' name='userName' value={loginRegister.userName} onChange={handleChange}></input>
            </div>
            <div>
                <label>Password</label>
                <input className='Regin' placeholder='password' name='password' value={loginRegister.password} onChange={handleChange}></input>
            </div>
            <div  className='regbtn'>
                <button className='regbutton' type='submit'>Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
