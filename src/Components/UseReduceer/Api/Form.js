
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { addItem, addUserEmail, addUserName, addUserPassword } from './Action';
import { useReducer, } from 'react';
import { ReducerApi, datas } from './Reducer';




const  ReducerForm = () => {


  const Navigate = useNavigate({})

const [ detail,dispatch] = useReducer(ReducerApi,datas)

 

const nameHandleChange = (e) =>{
   dispatch(addUserName(e.target.value));
    
}

const emailHandleChange = (e) =>{
   dispatch(addUserEmail(e.target.value))
}

const passwordHandleChange = (e) =>{
  dispatch(addUserPassword(e.target.value))
}

  const handleSubmit = (e) =>{
     e.preventDefault();
     dispatch( addItem({userName:detail.userName,userPassword:detail.userPassword,userEmail:detail.userEmail}) );

     Navigate("/reducertableapi")
  }

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
        '& > :not(style)': { m: 1,   },
        border:'2px solid grey',
        borderRadius:'5px'
      }}
      noValidate
      autoComplete="off"
    >
      <Box alignSelf={"center"}><h2>UseReducer Api Form</h2></Box>
      <TextField
          id="standard-textarea"
          label="Name"
          placeholder="Enter your Name"
          multiline
          variant="standard"
          name='userName'
          value={detail.userName}
          onChange={nameHandleChange}
        />
      <TextField
          id="standard-textarea"
          label="Email"
          placeholder="Enter your email"
          multiline
          variant="standard"
          name='userEmail'
          value={detail.userEmail}
          onChange={emailHandleChange}
        />
      <TextField
          id="standard-textarea"
          label="Password"
          placeholder="enter your Password"
          multiline
          variant="standard"
          name='userPassword'
          value={detail.userPassword}
          onChange={passwordHandleChange}
        />
      <Box
       alignSelf={"end"}
      >
         <Button variant="contained" type='submit'>Submit</Button>
      </Box>
      
    </Box>
    </div>
  )
}

export default ReducerForm
