import React from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, setData, setEditingIndex }) => {
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    navigate('/nonapiform');
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
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.password}</td>
              <td>
                <button className='edit' onClick={() => handleEdit(index)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      <div className='backbtn'><button className='back' onClick={() => navigate('/nonapiform')}>Back</button></div>
    </div>
  );
};

export default Table;
