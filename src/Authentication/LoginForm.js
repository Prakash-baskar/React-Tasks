import React from 'react';
import "./Login.css";
const LoginForm = () => {
  return (
    <div>
      <div>
        <form>
            <div>
                <label>UserName</label>
                <input></input>
            </div>
            <div>
                <label>Password</label>
                <input></input>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
