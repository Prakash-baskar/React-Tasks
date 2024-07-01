import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [loginRegister, setLoginRegister] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

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
    <div className="reg-form-container">
  <div className="reg-form">
    <form className="reg-main-lg" onSubmit={handleSubmit}>
      <h2 className="register-title"><h2>LOGIN FORM</h2></h2>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          className="reg-input"
          id="email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={loginRegister.email}
          onChange={handleChange}
          aria-label="Email"
          required
        />
      </div>
      <div className="form-group password-container">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          className="reg-input"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          name="password"
          value={loginRegister.password}
          onChange={handleChange}
          aria-label="Password"
          required
        />
         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className='password-iconlog' />
      </div>
      <button className="reg-button" type="submit">Login</button>
    </form>
  </div>
</div>

  
  );
};

export default LoginForm;
