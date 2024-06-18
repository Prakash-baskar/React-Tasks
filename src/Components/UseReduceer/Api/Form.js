import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { addItem, addUserEmail, addUserName, addUserPassword, editData, putData } from './Action';
import { useEffect, useReducer, useState } from 'react';
import { ReducerApi, datas } from './Reducer';
import { apiGetById } from '../../Service/Api';

const ReducerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate({});

  const [detail, dispatch] = useReducer(ReducerApi, datas);

  const [errors, setErrors] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

  useEffect(() => {
    if (id) {
      const fetchDataById = async () => {
        const response = await apiGetById(id);
        dispatch(editData(response));
      };
      fetchDataById();
    }
  }, [id]);

  const validate = () => {
    let tempErrors = { userName: '', userEmail: '', userPassword: '' };
    let isValid = true;

    if (!detail.userName) {
      tempErrors.userName = 'Name is required';
      isValid = false;
    }

    if (!detail.userEmail) {
      tempErrors.userEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(detail.userEmail)) {
      tempErrors.userEmail = 'Email is not valid';
      isValid = false;
    }

    if (!detail.userPassword) {
      tempErrors.userPassword = 'Password is required';
      isValid = false;
    } else if (detail.userPassword.length < 6) {
      tempErrors.userPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const nameHandleChange = (e) => {
    dispatch(addUserName(e.target.value));
  };

  const emailHandleChange = (e) => {
    dispatch(addUserEmail(e.target.value));
  };

  const passwordHandleChange = (e) => {
    dispatch(addUserPassword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        dispatch(putData(id, { userName: detail.userName, userEmail: detail.userEmail, userPassword: detail.userPassword }));
      } else {
        dispatch(addItem({ userName: detail.userName, userPassword: detail.userPassword, userEmail: detail.userEmail }));
      }
      navigate("/reducertableapi");
    }
  };

  return (
    <div>
      <Box onSubmit={handleSubmit}
        component="form"
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        width={500}
        marginLeft={63}
        marginTop={10}
        sx={{
          '& > :not(style)': { m: 1 },
          border: '2px solid grey',
          borderRadius: '5px',
          color: 'warning.main'
         
        }}
        noValidate
        autoComplete="off"
      >
        <Box alignSelf={"center"}><h2>UseReducer Api Form</h2></Box>
        <TextField
          id="outlined-basic"
          label="Name"
          placeholder="Enter your Name"
          multiline
          variant="outlined"
          name='userName'
          value={detail.userName}
          onChange={nameHandleChange}
          error={Boolean(errors.userName)}
          helperText={errors.userName}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          placeholder="Enter your email"
          multiline
          variant="outlined"
          name='userEmail'
          value={detail.userEmail}
          onChange={emailHandleChange}
          error={Boolean(errors.userEmail)}
          helperText={errors.userEmail}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          placeholder="enter your Password"
          multiline
          variant="outlined"
          name='userPassword'
          value={detail.userPassword}
          onChange={passwordHandleChange}
          error={Boolean(errors.userPassword)}
          helperText={errors.userPassword}
        />
        <Box alignSelf={"end"}>
          <Button variant="contained" type='submit'>Submit</Button>
        </Box>
      </Box>
    </div>
  );
};

export default ReducerForm;

