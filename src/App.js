import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';  
import { useReducer, useState } from 'react';
import Form from './Components/UseState/Normal/Form';
import Table from './Components/UseState/Normal/Table';
import FormApi from './Components/UseState/Api/Form';
import Navbar from './Components/Navbar/Navbar';
import { TableAPI } from './Components/UseState/Api/Table';
import FormMy from './Components/UseReduceer/Normal/Form';
import { UseReducerTable } from './Components/UseReduceer/Normal/Table';
import { Reducer,datas } from './Components/UseReduceer/Normal/Reducer';
import ReducerForm from './Components/UseReduceer/Api/Form';
import { ReduerTableApi } from './Components/UseReduceer/Api/Table';

function App() {
 
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [detail, dispatch] = useReducer(Reducer, datas)

  return (  
   <BrowserRouter >
   <Navbar/>
   <Routes> 
    <Route path='/' element={<Navigate to='/nonapiform'/>}/>
    <Route path="/nonapiform" element={<Form data={data} setData={setData} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />} />
    <Route path="/table" element={<Table data={data} setData={setData} setEditingIndex={setEditingIndex} />} />
    <Route path='/formapi' element ={<FormApi /> } />
    <Route path='/formapi/:id' element ={<FormApi /> } />
    <Route path='/tableapi' element ={< TableAPI/> } />
    <Route path='/material' element={<FormMy detail={detail} dispatch={dispatch}/>}/>
    <Route path='/reducertable' element={<UseReducerTable  detail={detail} dispatch={dispatch}/>}/>
    <Route path='/reducerform' element ={<ReducerForm  detail={detail} dispatch={dispatch}/> } />
    <Route path='/reducerform/:id' element ={<ReducerForm  detail={detail} dispatch={dispatch}/> } />
    <Route path='/reducertableapi' element ={<ReduerTableApi detail={detail} dispatch={dispatch}/> } />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
