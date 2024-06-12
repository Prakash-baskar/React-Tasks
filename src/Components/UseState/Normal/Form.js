import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({data,setData,editingIndex,setEditingIndex}) => {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [cpassword,setCPassword] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(()=>{
      if(editingIndex !== null){
        setName( data[editingIndex].name)
        setPassword(data[editingIndex].password)  
        setEmail(data[editingIndex].email)
        setCPassword(data[editingIndex].cpassword)
      }
    },[editingIndex,data]);

    const validate = () => {
      let tempErrors = {}; 
      if (!name) tempErrors.name = "Name is required.";
      if (!email) {
        tempErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "Email is invalid.";
      }
      if (!password) tempErrors.password = "Password is required.";
      else if (!/\d/.test(password)) {
        tempErrors.password = "Password must contain at least one number.";
      }
      if (!cpassword) {
        tempErrors.cpassword = "Confirm Password is required.";
      } else if (cpassword !== password) {
        tempErrors.cpassword = "Passwords do not match.";
      }
  
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit =(e) =>{
        e.preventDefault();
        if (!validate()) return;
        
        if(editingIndex !== null) {
           const updatedData = data.map ((item,index) =>
            index === editingIndex ? {name,password,email,cpassword} : item
          );
          setData(updatedData);
          setEditingIndex(null);
        }else{
           setData([...data,{name,password,email,cpassword}]);
        }
        setName('');
        setPassword('');
        setEmail('');
        setCPassword('')
        navigate('/table')
    };  
  return (
    <div>
        <div className='head'>
           <form onSubmit={handleSubmit}>
            <span><h2>Normal Form</h2></span>
             <div className='manageinput'>
               <label>Name</label>
               <input value={name} onChange={(e) =>{setName(e.target.value)}}></input>
               {errors.name && <p className="error">{errors.name}</p>}
             </div>
             <div className='manageinput'>
                <label>Email</label>
                <input value={email} onChange={(e) =>{setEmail(e.target.value)}}></input>
                {errors.email && <p className='error'>{errors.email}</p>}
             </div>
             <div className='manageinput'>
                <label>Password</label>
                <input value={password} onChange={(e) =>{setPassword(e.target.value)}}></input>
                {errors.password && <p className='error'>{errors.password}</p>}
             </div> 
             <div className='manageinput'>
                <label>Comfirm Password</label>
                <input value={cpassword} onChange={(e) =>{setCPassword(e.target.value)}}></input>
                {errors.cpassword && <p className='error'>{errors.cpassword}</p>}
             </div>
         
             <div className='btn'>
                <button className='submit' type='submit'>{editingIndex !== null ? 'update': 'Submit'}</button>
             </div> 
           </form>
        </div>
    </div>
  )
}

export default Form


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Form = ({ data, setData, editingIndex, setEditingIndex }) => {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (editingIndex !== null) {
//       setName(data[editingIndex].name);
//       setPassword(data[editingIndex].password);
//     }
//   }, [editingIndex, data]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingIndex !== null) {
//       const updatedData = data.map((item, index) =>
//         index === editingIndex ? { name, password } : item
//       );
//       setData(updatedData);
//       setEditingIndex(null);
//     } else {
//       setData([...data, { name, password }]);
//     }
//     setName('');
//     setPassword('');
//     navigate('/table');
//   };

//   return (
//     <div>
//       <div className='head'>
//         <form onSubmit={handleSubmit}>
//           <div className='manageinput'>
//             <label>Name</label>
//             <input value={name} onChange={(e) => setName(e.target.value)}></input>
//           </div>
//           <div className='manageinput'>
//             <label>Password</label>
//             <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
//           </div>
//           <div>
//             <button type='submit'>{editingIndex !== null ? 'Update' : 'Submit'}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;

