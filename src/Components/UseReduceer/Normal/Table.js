import React from 'react' 
import { useNavigate } from 'react-router-dom'


export const UseReducerTable = ({detail,dispatch}) => {
 
    const navigate = useNavigate('')
    const handleDelete= (index) =>{
       dispatch({type: "deleteUser" , payload: index})
    }

    const handleEdit = (index) =>{
      const {userName, userEmail, userPassword} = detail.userData[index];
      dispatch({type: "editUser", payload: {index, userName,userEmail,userPassword}})
      navigate("/material")
    }

  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { detail.userData.map((value, index) =>{
               return(
                <tr key={index}>
                  <td>{value.userName}</td>
                  <td>{value.userEmail}</td>
                  <td>{value.userPassword}</td>
                  <td>
                    <button type='button'  className='edit' onClick={ () => handleEdit(index)}>Edit</button>
                    <button type='button'className='delete' onClick={ () => handleDelete(index)}>Delete</button>
                  </td>
               </tr>
               )
            })
            }
        </tbody>
      </table>
    </div>
  )
}


