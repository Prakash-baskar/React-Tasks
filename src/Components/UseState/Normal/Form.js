import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({data,setData,editingIndex,setEditingIndex}) => {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
      if(editingIndex !== null){
        setName( data[editingIndex].name)
        setPassword(data[editingIndex].password)  
      }
    },[editingIndex,data]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        
        if(editingIndex !== null) {
           const updatedData = data.map ((item,index) =>
            index === editingIndex ? {name,password} : item
          );
          setData(updatedData);
          setEditingIndex(null);
        }else{
           setData([...data,{name,password}]);
        }
        setName('');
        setPassword('');
        navigate('/table')
    };  
  return (
    <div>
        <div className='head'>
           <form onSubmit={handleSubmit}>
             <div className='manageinput'>
               <label>Name</label>
               <input value={name} onChange={(e) =>{setName(e.target.value)}}></input>
             </div>
             <div className='manageinput'>
                <label>Password</label>
                <input value={password} onChange={(e) =>{setPassword(e.target.value)}}></input>
             </div> 
             <div>
                <button type='submit'>{editingIndex !== null ? 'update': 'Submit'}</button>
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

