import { useEffect, useReducer } from "react"
import { ReducerApi, datas } from "./Reducer"
import { apiGetById, apiGetMethod } from "../../Service/Api"
import { deleteData, getData } from "./Action"
import {  useNavigate } from "react-router-dom"


export const ReduerTableApi = ({detail}) =>{
    
    const [user,dispatch] = useReducer(ReducerApi,datas)
    const navigate = useNavigate()
    const fetchData = async () =>{
        const response = await apiGetMethod();
        dispatch(getData(response));
    } 

    useEffect(() =>{
        fetchData();

    },[]) ;

    const handleDelete = async(id) =>{
       dispatch(deleteData(id))
       setTimeout( () => {
        fetchData()
       },300)
    }

    const handleEdit = async(id) =>{
        dispatch(apiGetById(id))
        navigate(`/reducerform/${id}`)
    }
    return(
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { user.userData.map((value, index) =>{
               return(
                <tr key={index}>
                  <td>{value.userName}</td>
                  <td>{value.userEmail}</td>
                  <td>{value.userPassword}</td>
                  <td>
                    <button type='button'  className='edit' onClick={() => handleEdit(value.id)}>Edit</button>
                    <button type='button'className='delete' onClick={() => handleDelete(value.id)} >Delete</button>
                  </td>
               </tr>
               )
            })
            }
        </tbody>
      </table>
    </div>
    )
        
    

}