import { useState } from "react"
import { apiPostMethod } from "../../Service/Api"
import { useNavigate } from "react-router-dom"


const FormApi = () => {
  const navigate = useNavigate()
   
  const [user,setUser] = useState({
    userEmail: '',
    userPassword: '',
  })

const handleChange = (e) =>{
    const {name,value} = e.target
    setUser(
      {
        ...user,
        [name]:value,
      }
    )
}

const handleSubmit = (e) =>{
    e.preventDefault();
    apiPostMethod(user)
    navigate('/tableapi')
}
 
  return (
    <div>
      <div className='head'>
        <form onSubmit={handleSubmit}>
        <span>UseState Api</span>
          <div className='manageinput'>
            <label>Email</label>
            <input value={user.userEmail} name="userEmail" onChange={handleChange}/>
          </div>
          <div className='manageinput'>
            <label>Password</label>
            <input value={user.userPassword} name="userPassword" onChange={handleChange}/>
          </div>
          <div>
            <button>Submit</button> 
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormApi
