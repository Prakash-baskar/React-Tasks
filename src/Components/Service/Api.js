import axios from "axios";

export const MY_BASE_URL = 'https://65adedce1dfbae409a739505.mockapi.io/sample/UseState';


export const apiPostMethod = async (data) =>{
    try {
        const response =await axios.post(MY_BASE_URL,data)
        return await response.data
    } catch (error) {
        console.error(error);
    }
}

export const apiGetMethod = async () =>{
    try {
        const response = await axios.get(MY_BASE_URL)
        const data = await response.data 
        return data
    } catch (error) {
        console.error(error);
    }
}


export const apiGetById = async (id) =>{
    try {
        const response = await axios.delete(`${MY_BASE_URL}/${id}`)
        const data = await response.data
        return data
    } catch (error) {
        console.error(error);
    }
}

export const apiGetPutId = async (id) =>{
    try {
        const response = await axios.put(`${MY_BASE_URL}/${id}`)
        const data = await response.data
        return data
    } catch (error) {
       console.error(error); 
    }
}