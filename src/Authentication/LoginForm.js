import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loginRegister, setLoginRegister] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginRegister({
      ...loginRegister,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/login",
        {
          email: loginRegister.email,
          password: loginRegister.password,
        }
      );

      

      const responseBody = response.data.data.body;
      console.log("res-body",responseBody);

      if (responseBody && responseBody.jwt) {
        console.log('hello');
        localStorage.setItem("token", responseBody.jwt);
        localStorage.setItem("email", responseBody.userEmail); // Store the email as username

        // Determine user role and navigate accordingly (assuming the response structure includes role)
        if (responseBody.role === "USER") {
          navigate("/usertable");
        } else if (responseBody.role === "ADMIN") {
          navigate("/admintable");
        } else {
          console.error("Unexpected user role", responseBody.role);
        }
      } else {
        console.error("Unexpected response structure", response.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
      // Optionally, you can set state to display an error message to the user
    }
  };

  return (
    <div>
      <div className='Regform'>
        <form className='Regmainlg' onSubmit={handleSubmit}>
          <div className='register'><h2>Login Form</h2></div>
          <div>
            <label>Email</label>
            <input className='Regin' placeholder='email' name='email' value={loginRegister.email} onChange={handleChange} />
          </div>
          <div>
            <label>Password</label>
            <input className='Regin' placeholder='password' name='password' value={loginRegister.password} onChange={handleChange} />
          </div>
          <div className='regbtn'>
            <button className='regbutton' type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
