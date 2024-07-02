import React, { useState } from 'react';
import "./Login.css";
import registerFormApi from './Api/RegisterApi';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as  Yup from 'yup'

const RegisterForm = () => {
    const navigate = useNavigate();
    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    // const [register, setRegister] = useState({
    //     userName: "",
    //     email: "",
    //     mobileNo: "",
    //     password: "",
    //     confirmPassword: "",
    //     userRole: "",
    // });


    // validation schema errors to stored values...
    const validationSchema = Yup.object({
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        mobileNo: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        userRole: Yup.string().required('Required'),
    });
   
    

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setRegister({
    //         ...register,
    //         [name]: value
    //     });
    // }

    const handleSubmit = async (value) => {
       
        // if (register.password !== register.confirmPassword) {
        //     setError("Passwords do not match");
        //     return;
        // }
        try {
            const response = await registerFormApi(value);
            if (response && response.data && response.data.token) {
                // setRegister({
                //     userName: "",
                //     email: "",
                //     mobileNo: "",
                //     password: "",
                //     confirmPassword: "",
                //     userRole: "",
                // });
                navigate("/loginform");
            } else {
                setError(response.data.message || "Registration failed. Role is not applicable");
            }
        } catch (error) {
            setError("An error occurred. Role is not applicable.");
        }
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    // const toggleConfirmPasswordVisibility = () => {
    //     setShowConfirmPassword(!showConfirmPassword);
    // };
    const formik = useFormik({
        initialValues:{
          userName:"",
          email:"",
          mobileNo:"",
          password:"",
          confirmPassword:"",
          userRole:"",
        },validationSchema,
        onSubmit:handleSubmit
      })
console.log(formik.errors.confirmPassword);
console.log(formik.errors.password);
    return (
        <div>
            <div className='Regform'>
                <form className='Regmain' onSubmit={formik.handleSubmit}>
                    <div className='register'><h2>Register Form</h2></div>
                    <div>
                        <label>UserName</label>
                        <input className='Regin' name='userName' value={formik.values.userName} onChange={formik.handleChange} placeholder='UserName' onBlur={formik.handleBlur} />
                        {formik.touched.userName && formik.errors.userName?(<span className='errors'>{formik.errors.userName}</span>):null}
                    </div>
                    <div>
                        <label>Email</label>
                        <input className='Regin' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Email' onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email?(<span className='errors'>{formik.errors.email}</span>):null}
                    </div>
                    <div>
                        <label>Mobile Number</label>
                        <input className='Regin' name='mobileNo' value={formik.values.mobileNo} onChange={formik.handleChange} placeholder='Mobile Number' onBlur={formik.handleBlur}/>
                        {formik.touched.mobileNo && formik.errors.mobileNo?(<span className='errors'>{formik.errors.mobileNo}</span>):null}
                    </div>
                    <div className='password-container'>
                        <label>Password</label>
                        <input className='Regin' name='password' type='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Enter Password' onBlur={formik.handleBlur} />
                        {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className='password-icon' /> */}
                        {formik.touched.password && formik.errors.password?(<span className='errors'>{formik.errors.password}</span>):null}
                    </div>
                    <div className='password-container'>
                        <label>Confirm Password</label>
                        <input className='Regin' name='confirmPassword' type='password' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Confirm Your Password' />
                        {/* <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} className='password-icon' /> */}
                        {formik.touched.confirmPassword && formik.errors.confirmPassword?(<span className='errors'>{formik.errors.confirmPassword}</span>):null}
                    </div>
                    <div >
                        <label htmlFor="Role">User Role</label> 
                        <div className='radio '>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="userRole"
                                    value="Admin"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.userRole === 'Admin'}
                                />
                                 Admin
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="userRole"
                                    value="User"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.userRole === 'User'}
                                />
                                 User
                            </label>
                        </div>
                        </div>
                        {formik.touched.userRole && formik.errors.userRole ? (
                            <div className='errors'>{formik.errors.userRole}</div>
                        ) : null}
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
