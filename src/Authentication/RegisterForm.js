import React, { useState } from 'react';
import "./Login.css";
import registerFormApi from './Api/RegisterApi';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        userName: "",
        email: "",
        mobileNo: "",
        password: "",
        confirmPassword: "",
        userRole: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({
            ...register,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (register.password !== register.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await registerFormApi(register);
            if (response && response.data && response.data.token) {
                setRegister({
                    userName: "",
                    email: "",
                    mobileNo: "",
                    password: "",
                    confirmPassword: "",
                    userRole: "",
                });
                navigate("/loginform");
            } else {
                setError(response.data.message || "Registration failed. Role is not applicable");
            }
        } catch (error) {
            setError("An error occurred. Role is not applicable.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                        <input className='Regin' name='mobileNo' value={register.mobileNo} onChange={handleChange} placeholder='Mobile Number' />
                    </div>
                    <div className='password-container'>
                        <label>Password</label>
                        <input className='Regin' name='password' type={showPassword ? 'text' : 'password'} value={register.password} onChange={handleChange} placeholder='Enter Password' />
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className='password-icon' />
                    </div>
                    <div className='password-container'>
                        <label>Confirm Password</label>
                        <input className='Regin' name='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} value={register.confirmPassword} onChange={handleChange} placeholder='Confirm Your Password' />
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} className='password-icon' />
                    </div>
                    <div>
                        <label htmlFor="Role">User Role</label>
                        <select className='select' name='userRole' id='Role' value={register.userRole} onChange={handleChange}>
                            <option value="" disabled>Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    <div className='regbtn'>
                        <button className='regbutton' type='submit'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
