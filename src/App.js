
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './Components/UseState/Normal/Form';
import Table from './Components/UseState/Normal/Table';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form   data={data}  setData={setData}/>}  />
      <Route path='/table' element={<Table  data={data} setData={setData}/>}  />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
