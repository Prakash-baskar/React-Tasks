

import { apiDeleteById, apiGetById, apiPostMethod, apiPutMethod } from "../../Service/Api";
import { ADD_ITEM, ADD_USER_EMAIL, ADD_USER_NAME, ADD_USER_PASSWORD, DELETE_DATA, EDIT_DATA, EDIT_SUCCESS, GET_DATA } from "./Type";



export const addUserName = (data) =>({
    type:ADD_USER_NAME,
    payload:data
})

export const addUserEmail =(data) =>({
    type:ADD_USER_EMAIL,
    payload:data
})

export const addUserPassword =(data) =>({
    type:ADD_USER_PASSWORD,
    payload:data
})

export const addItem = (data) =>{
    apiPostMethod(data);
    return {
        type:ADD_ITEM,
        payload:data}
}

export const getData = (data) =>{
    return{
        type:GET_DATA,
        payload:data
    }
}

export const deleteData = (data) =>{
    apiDeleteById(data)
    return{
        type:DELETE_DATA,
        payload:data
    }
}

export const editData = (data) =>{
    apiGetById(data)
    return{
        type:EDIT_DATA,
        payload:data
    }
}

export const putData = (id, data) =>{
    apiPutMethod(id,data)
    return{
        type:EDIT_SUCCESS,
    }
}