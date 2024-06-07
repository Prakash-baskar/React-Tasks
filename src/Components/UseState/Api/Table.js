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
    navigate('/');
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
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <div><button onClick={() => navigate('/')}>Back</button></div>
      </table>
    </div>
  );
};

export default Table;
