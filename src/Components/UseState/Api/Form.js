import React, { useState } from 'react'

const FormApi = () => {

  const [intialValue,SetIntialValue] = useState(
    {
      email:'',
      password:'',

    }
  );
  const handleChange = (e) =>{
      const {name,value} = e.target;
      console.log(e.target.value);
      SetIntialValue({
        ...intialValue,
        [name]:value,
      });
  }
  return (
    <div>
      <div className='head'>
        <form>
        <span>UseState Api</span>
          <div className='manageinput'>
            <label>Email</label>
            <input
            name='email' 
            value={intialValue.email} onChange={handleChange}></input>
          </div>
          <div className='manageinput'>
            <label>Password</label>
            <input 
            name='password'
            value={intialValue.password} onChange={handleChange}></input>
          </div>
          <div>
            <button>Submit</button> 
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormApi
