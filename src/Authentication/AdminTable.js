import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    userRole: '',
    status: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token not found in local storage');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/admin/getAllusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      mobileNo: user.mobileNo,
      password: '',
      confirmPassword: '',
      userRole: user.userRole,
      status: user.status,
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token not found in local storage');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/api/user/update', {
        ...formData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUsers = users.map(user =>
        user.userId === formData.userId ? response.data.Details : user
      );
      setUsers(updatedUsers);
      setIsEditing(false);
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token not found in local storage');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUsers = users.filter(user => user.userId !== userId);
      setUsers(updatedUsers);
      alert('User deleted successfully');
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  if (error) {
    return (
      <div className="container tab-style">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container tab-style">
      <div>
        <h2>Admin Profile</h2>
        {isEditing ? (
          <EditForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSaveEdit={handleSaveEdit}
            setIsEditing={setIsEditing}
          />
        ) : (
          <UserTable
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

const UserTable = ({ users, handleEdit, handleDelete }) => (
  <table className="table2">
    <thead>
      <tr>
        <th>User Name</th>
        <th>Email</th>
        <th>Mobile Number</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.userId}>
          <td>{user.userName}</td>
          <td>{user.email}</td>
          <td>{user.mobileNo}</td>
          <td>{user.status}</td>
          <td>
            <button className="btn btn-primary" onClick={() => handleEdit(user)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(user.userId)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const EditForm = ({ formData, handleInputChange, handleSaveEdit, setIsEditing }) => (
  <div>
    <label>
      User Name:
      <input
        className="form-control"
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Email:
      <input
        className="form-control"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Password:
      <input
        className="form-control"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Confirm Password:
      <input
        className="form-control"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Mobile Number:
      <input
        className="form-control"
        type="text"
        name="mobileNo"
        value={formData.mobileNo}
        onChange={handleInputChange}
      />
    </label>
    <label>
      User Role:
      <input
        className="form-control"
        type="text"
        name="userRole"
        value={formData.userRole}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Status:
      <input
        className="form-control"
        type="text"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
      />
    </label>
    <button className="btn btn-primary" onClick={handleSaveEdit}>Save</button>
    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
  </div>
);

export default AdminTable;
