import React from 'react'
import { useNavigate } from 'react-router-dom'


const Table = ({data,setData,onEdit}) => {
    
      const navigate = useNavigate();

    const handleEdit = (index) =>{
        onEdit(index)
        navigate('/')
    };
    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
      };
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Password</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           {data.map((item,index) =>(
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.password}</td>
                <td>
                    <button onClick={ ()=> handleEdit(index)}>Edit</button>
                    <button onClick={  ()=> handleDelete(index)}>Delete</button>
                </td>
            </tr>
           ))}
        </tbody>

      </table>
    </div>
  )
}

export default Table
