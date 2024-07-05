import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const navigate = useNavigate();

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

      setUserData(response.data.Details);
      setFormData({
        userId: response.data.Details.userId,
        userName: response.data.Details.userName,
        email: response.data.Details.email,
        mobileNo: response.data.Details.mobileNo,
        userRole: response.data.Details.userRole,
      });
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleTokenError = () => {
    setError({ error: { reason: 'Token not found in local storage' } });
    navigate('/usertable');
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
        userId: formData.userId,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        mobileNo: formData.mobileNo,
        userRole: formData.userRole,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data.Details);
      setIsEditing(false);
      fetchUserData();
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const useremail = localStorage.getItem('email');

    if (!token || !useremail) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(null);
      // alert('User deleted successfully');
      setShowModal(false);
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
      setShowModal(false);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          <h2 className='userdetail'>User Details</h2>
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
                Confirm Password:
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formData.userName}</td>
                    <td>{formData.email}</td>
                    <td>{formData.mobileNo}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                      <button className="btn btn-danger" onClick={handleShowModal}>Delete</button>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
