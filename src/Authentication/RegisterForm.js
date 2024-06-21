import React, { useState } from 'react';
import "./Login.css";
import registerFormApi from './Api/RegisterApi';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {

    const navigate = useNavigate("")
    const [register,setRegister] = useState({
        userName:"",
        email:"",
        mobileNo:"",
        password:"",
        confirmPassword:"",
        userRole:"",
    })
   
   

    const handleChange = (e) =>{
       const {name,value} = e.target
       setRegister({
        ...register,
        [name]:value
       });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(register);
        registerFormApi(register);  
        setRegister({
            userName:"",
            email:"",
            mobileNo:"",
            password:"",
            confirmPassword:"",
            userRole:"",

        })
       navigate("/loginform")
    };

    return (
        <div>
            <div className='Regform'>
                <form className='Regmain' onSubmit={handleSubmit}>

                    <div className='register'><h2>Register Form</h2></div>
                    <div>
                        <label>UserName</label>
                        <input className='Regin' name='userName' value={register.userName} onChange={handleChange} placeholder='UserName' />
                    </div>
                    <div>
                        <label>Email</label>
                        <input className='Regin' name='email' value={register.email} onChange={handleChange} placeholder='Email' />
                    </div>
                    <div>
                        <label>Mobile Number</label>
                        <input className='Regin' name='mobileNo' value={register.mobileNo} onChange={handleChange} placeholder='MobileNumber' />
                    </div>
                    <div>
                        <label>Password</label>
                        <input className='Regin' name='password' type='password' value={register.password} onChange={handleChange} placeholder='Enter Password' />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input className='Regin' name='confirmPassword' type='password'  value={register.confirmPassword} onChange={handleChange} placeholder='Confirm Your Password' />
                    </div>
                    <div>
                        <label htmlFor="Role">User Role</label>
                        <select className='select' name='userRole' id='Role' value={register.userRole} onChange={handleChange}>
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
    );
};

export default RegisterForm;

