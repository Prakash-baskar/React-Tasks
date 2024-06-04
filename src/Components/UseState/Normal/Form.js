import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({data,setData,editIndex}) => {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() =>{
        if(editIndex !== null){
            setName(data[editIndex].name);
            setPassword(data[editIndex].password);
        }
        else{
            setName('');
            setPassword('');
        }
    },[editIndex,data])
    
    const navigate = useNavigate();

    const handleSubmit =(e) =>{
        e.preventDefault();
        setData([
            ...data,
            {
                name,
                password
            }
        ]);
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
                <button type='submit'>{editIndex !== null ? 'update':'Submit'}</button>
             </div> 
           </form>
        </div>
    </div>
  )
}

export default Form
