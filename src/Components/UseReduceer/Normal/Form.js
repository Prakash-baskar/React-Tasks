import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { useNavigate } from 'react-router-dom';


const FormMy = ({detail,dispatch}) => {
 

  // const [detail, dispatch] = useReducer(Reducer, data)

  const navigate = useNavigate({})

  const handleChange = (e) =>{
     const {name , value } = e.target;
     dispatch({type:name , payload:value})
  }

  const handleSubmit= (e) =>{
     e.preventDefault();
     dispatch({type:"submit"});
    //  console.log('submit');
    navigate("/reducertable")
  };
  
  return (
    <div>
      
      <Box onSubmit={handleSubmit}
       component="form"
       display="flex" 
       flexDirection={"column"}
       justifyContent={"center"}
       width={600}
       marginLeft={55}
       
       
      sx={{
        '& > :not(style)': { m: 1,   },
        border:'2px solid grey',
        borderRadius:'5px'
      }}
      noValidate
      autoComplete="off"
    >
      <Box alignSelf={"center"}><h2>UseReducer Form</h2></Box>
      <TextField id="outlined-basic" label="Name" name="userName" value={detail.userName} onChange={handleChange} variant="outlined" />
      <TextField id="outlined-basic" label="Email" name="userEmail" value={detail.userEmail} onChange={handleChange} variant="outlined" />
      <TextField id="outlined-basic" label="Password" name="userPassword" value={detail.userPassword} onChange={handleChange} variant="outlined" />
      <Box
       alignSelf={"end"}
      >
         <Button variant="contained" type='submit'>Submit</Button>
      </Box>
      
    </Box>
    </div>
  )
}

export default FormMy
