import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const FormMy = ({ detail, dispatch }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!detail.userName) {
      newErrors.userName = 'Name is required';
    }
    if (!detail.userEmail) {
      newErrors.userEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(detail.userEmail)) {
      newErrors.userEmail = 'Email is invalid';
    }
    if (!detail.userPassword) {
      newErrors.userPassword = 'Password is required';
    } else if (detail.userPassword.length < 6) {
      newErrors.userPassword = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch({ type: 'submit' });
      navigate('/reducertable');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <Box
        onSubmit={handleSubmit}
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width={600}
        marginLeft={55}
        sx={{
          '& > :not(style)': { m: 1 },
          border: '2px solid grey',
          borderRadius: '5px',
          color: 'warning.main'
        }}
        noValidate
        autoComplete="off"
      >
        <Box alignSelf="center">
          <h2>UseReducer Form</h2>
        </Box>
        <TextField
          id="outlined-basic"
          label="Name"
          name="userName"
          value={detail.userName}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.userName}
          helperText={errors.userName}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          name="userEmail"
          value={detail.userEmail}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.userEmail}
          helperText={errors.userEmail}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          name="userPassword"
          value={detail.userPassword}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.userPassword}
          helperText={errors.userPassword}
        />
        <Box alignSelf="end">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default FormMy;

