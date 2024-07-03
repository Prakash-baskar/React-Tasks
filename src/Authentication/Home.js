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
          <div className='let'>
            <h2>LET'S GET YOU REGISTERED</h2>
          </div>
          <div> 
            <button className='registernow' onClick={handleClick}>REGISTER NOW</button>
          </div>
        </div>
    </div>
  )
}

export default Home
