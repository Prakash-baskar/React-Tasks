import React, { useEffect, useState } from 'react'
import { apiDeleteById, apiGetMethod, apiPutMethod } from '../../Service/Api'
import { useNavigate } from 'react-router-dom'

export const TableAPI = () => {

  const navigate = useNavigate();
  const [user,setUser] = useState({
    success:false
  })

 async function apiData() {
    const data = await apiGetMethod()
    setUser({
      ...user
      ,data,
      success:true
    })
  }
  useEffect(
    () =>{
      apiData()
    },[]
  )
  console.log(user);

  const handleEdit = (id) =>{
    apiPutMethod(id);
    navigate(`/formapi/${id}`)
  }

  const handleDelete = async (id) =>{
    setUser({
      ...user,
      success:false
    })
    const status = await apiDeleteById(id); 
    if(status == 200) apiData()
  }
  return (
    <div>
      {
       user.success ?
       <> 
       <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.data.map((item,index) => (
            <tr key={item.id}>
              <td>{index +1}</td>
              <td>{item.userName}</td>
              <td>{item.userEmail}</td>
              <td>{item.userPhone}</td>
              <td>{item.userPassword}</td>
              <td>
                <button className='edit' onClick={ () =>handleEdit(item.id)}>Edit</button>
                <button className='delete' onClick={ () =>handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
       
      </table>
       <div className='backbtn'><button className='back' onClick={ () => navigate('/formapi')}>Back</button></div> 
       </> : 'Loading....'
      
      }
    </div>
  )
}



