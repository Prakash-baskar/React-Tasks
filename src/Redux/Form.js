import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ReduxForm = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
  return (
        <div>
           <div className='Regform'>
                <form className='Regmain'>
                    <div className='register'><h2>Register Form</h2></div>
                    <div>
                        <label>UserName</label>
                        <input className='Regin' name='userName'  placeholder='UserName' />
                    </div>
                    <div>
                        <label>Email</label>
                        <input className='Regin' name='email'  placeholder='Email' />
                    </div>
                    <div>
                        <label>Mobile Number</label>
                        <input className='Regin' name='mobileNo' placeholder='Mobile Number' />
                    </div>
                    <div className='password-container'>
                        <label>Password</label>
                        <input className='Regin' name='password' type={showPassword ? 'text' : 'password'} placeholder='Enter Password' />
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className='password-icon' />
                    </div>
                    <div className='password-container'>
                        <label>Confirm Password</label>
                        <input className='Regin' name='confirmPassword' type={showConfirmPassword ? 'text' : 'password'}  placeholder='Confirm Your Password' />
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} className='password-icon' />
                    </div>
                    <div>
                        <label htmlFor="Role">User Role</label>
                        <select className='select' name='userRole' id='Role'>
                            <option value="" disabled>Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    {/* {error && <div className='error-message'>{error}</div>} */}
                    <div className='regbtn'>
                        <button className='regbutton' type='submit'>Register</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default ReduxForm;
