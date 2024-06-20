import React, { useState } from 'react'
import "./Login.css"
const RegisterForm = () => {

    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [userRole,setUserRole] = useState("")

    const handleSubmit = () =>{
        localStorage.setItem('userName', userName);
        localStorage.setItem('email',email);
        localStorage.setItem('mobileNo', mobileNo);
        localStorage.setItem('password', password);
        localStorage.setItem('confirmPassword', confirmPassword);
        localStorage.setItem('userRole', userRole);

        setUserName("");
        setEmail("");
        setMobileNo("");
        setPassword("");
        setConfirmPassword("");
        setUserRole("");

        console.log()
    }

  return (
    <div>
      <div className='Regform'>
        <form className='Regmain' onSubmit={handleSubmit}>
            <div className='register'><h2>Rgister Form</h2></div>
            <div>
                <label>UserName</label>
                <input className='Regin' value={userName} onChange={ (e) =>{setUserName(e.target.value)}} placeholder='UserName'></input>
            </div>
            <div>
                <label>Email</label>
                <input className='Regin' value={email} onChange={ (e) =>{setEmail(e.target.value)}} placeholder='Email'></input>
            </div>
            <div>
                <label>Mobile Number</label>
                <input className='Regin' value={mobileNo} onChange={ (e) =>{setMobileNo(e.target.value)}} placeholder='MobileNumber'></input>
            </div>
            <div>
                <label>Password</label>
                <input className='Regin' value={password} onChange={ (e) =>{setPassword(e.target.value)}} placeholder='Enter Password'></input>
            </div>
            <div>
                <label>Confirm Password</label>
                <input className='Regin' value={confirmPassword} onChange={ (e) =>{setConfirmPassword(e.target.value)}} placeholder='Confirm Your Password'></input>
            </div>
            <div>
                <label htmlFor="Role">User Role</label>
                    <select
                     className='select'
                     name='userRole'
                     id='Role'
                     value={userRole}
                     onChange={ (e) =>{setUserRole(e.target.value)}}
                    >
                     <option value="Admin">Admin</option>
                     <option value="User">User</option>
                    </select>
            </div>
            <div className='regbtn'>
                <button className='regbutton' type='submit'>Register</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
