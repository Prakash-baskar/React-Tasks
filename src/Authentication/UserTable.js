import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    email: '',
    mobileNo: '',
    status: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const useremail = localStorage.getItem('email');

      if (!token || !useremail) {
        handleTokenError();
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${useremail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.headers['content-type'] !== 'application/json') {
          throw new Error('Server did not respond with JSON data');
        }

        setUserData(response.data);
        setFormData({
          id: response.data.Details.id,
          userName: response.data.Details.userName,
          email: response.data.Details.email,
          mobileNo: response.data.Details.mobileNo,
          status: response.data.Details.status,
        });
      } catch (err) {
        const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
        setError(err.response?.data || defaultError);
      }
    };

    fetchUserData();
  }, []);

  const handleTokenError = () => {
    setError({ error: { reason: 'Token not found in local storage' } });
    // Optionally, you can redirect the user to the login page or handle this case accordingly
    navigate('/usertable'); // Example redirection to login page
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/user/update`, {
        id: formData.id,
        userName: formData.userName,
        email: formData.email,
        mobileNo: formData.mobileNo,
        status: formData.status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data.Details);
      setIsEditing(false);
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
      handleTokenError();
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUser/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(null);
      alert('User deleted successfully');
     
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.error?.reason || 'No error message available'}</p>
        <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
      </div>
    );
  }

  return (
    <div className="">
      {userData ? (
        <div>
          <h2>User Profile</h2>
          {isEditing ? (
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
                Status:
                <input
                  className="form-control"
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </label>
              <button className="btn btn-primary" onClick={handleEdit}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <table className="usertable">
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
                  <tr>
                    <td>{formData.userName}</td>
                    <td>{formData.email}</td>
                    <td>{formData.mobileNo}</td>
                    <td>{formData.status}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserTable;
