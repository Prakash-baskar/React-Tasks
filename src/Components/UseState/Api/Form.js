import { useEffect, useState } from "react"
import { apiGetById, apiPostMethod, apiPutMethod } from "../../Service/Api"
import { useNavigate, useParams } from "react-router-dom"


const FormApi = () => {
  const navigate = useNavigate()
  
  const urlProms = useParams()
   
  const [user,setUser] = useState({
    userEmail: '',
    userPassword: '',
  }) 

  async function fetchData(id) {
    const data = await apiGetById(id)
    setUser(
      {
        ...user,
        userEmail:data.userEmail,
        userPassword:data.userPassword
      }
    )
  }
useEffect( () => {
  if(urlProms.id !== undefined){ 
    fetchData(urlProms.id)
  }
},[])


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
   if( urlProms.id !== undefined){
    apiPutMethod(urlProms.id,user)
   }else{
    apiPostMethod(user)
   }
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
          <div className="btn">
            <button className="submit">Submit</button> 
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormApi
