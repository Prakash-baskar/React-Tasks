import axios from "axios";

export const MY_BASE_URL = 'https://65adedce1dfbae409a739505.mockapi.io/sample/UseState';

// Api post method
export const apiPostMethod = async (data) =>{
    try {
        const response =await axios.post(MY_BASE_URL,data)
        return await response.data
    } catch (error) {
        console.error(error);
    }
}

// api to get method show to table
export const apiGetMethod = async () =>{
    try {
        const response = await axios.get(MY_BASE_URL)
        const data = await response.data 
        return data
    } catch (error) {
        console.error(error);
    }
}

// api get by edit form 
export const apiGetById = async (id) =>{
    try {
        const response = await axios.get(`${MY_BASE_URL}/${id}`)
        const data = await response.data
        return data
    } catch (error) {
       console.error(error); 
    }
}

// api to delete method
export const apiDeleteById = async (id) =>{
    try {
        const response = await axios.delete(`${MY_BASE_URL}/${id}`)
        const data = response.status
        return data
    } catch (error) {
        console.error(error);
    }
}

// api put method edit to resubmit
export const apiPutMethod = async (id,obj) =>{
    try {
        const response = await axios.put(`${MY_BASE_URL}/${id}`,obj)
        const data = await response.data
        return data
    } catch (error) {
       console.error(error); 
    }
}