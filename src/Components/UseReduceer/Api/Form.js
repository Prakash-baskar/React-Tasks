import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const  ReducerForm = () => {
  return (
    <div>
      <Box 
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
        />
      <TextField
          id="standard-textarea"
          label="Email"
          placeholder="Enter your email"
          multiline
          variant="standard"
        />
      <TextField
          id="standard-textarea"
          label="Password"
          placeholder="enter your Password"
          multiline
          variant="standard"
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
