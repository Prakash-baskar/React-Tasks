import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
  
 const navigate = useNavigate();
 const handleClick = (e) => {
  e.preventDefault();
  navigate('/RegisterForm')
 }

  return (
    <div>
        <div className='home'>
          <button onClick={handleClick}>Register Now</button>
        </div>
    </div>
  )
}

export default Home
