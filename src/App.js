import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';  
import { useState } from 'react';
import Form from './Components/UseState/Normal/Form';
import Table from './Components/UseState/Normal/Table';
import FormApi from './Components/UseState/Api/Form';
import Navbar from './Components/Navbar/Navbar';
import { TableAPI } from './Components/UseState/Api/Table';

function App() {
 
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  return (  
   <BrowserRouter >
   <Navbar/>
   <Routes> 
    <Route path='/' element={<Navigate to='/nonapiform'/>}/>
    <Route path="/nonapiform" element={<Form data={data} setData={setData} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />} />
    <Route path="/table" element={<Table data={data} setData={setData} setEditingIndex={setEditingIndex} />} />
    <Route path='/formapi' element ={<FormApi /> } />
    <Route path='/tableapi' element ={< TableAPI/> } />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
