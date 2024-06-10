import React, { useEffect, useState } from 'react'
import { apiGetById, apiGetMethod, apiGetPutId } from '../../Service/Api'
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
    apiGetPutId(id);
    navigate('/formapi')
  }

  const handleDelete = (id) =>{
     apiGetById(id);
  }
  return (
    <div>
      {
       user.success ?  <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.data.map((item) => (
            <tr key={item.id}>
              <td>{item.userEmail}</td>
              <td>{item.userPassword}</td>
              <td>
                <button onClick={ () =>handleEdit(item.id)}>Edit</button>
                <button onClick={ () =>handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <div><button onClick={ () => navigate('/formapi')}>Back</button></div>
      </table> : 'Loading....'
      }
    </div>
  )
}



