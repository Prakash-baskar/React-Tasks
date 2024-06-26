import axios from "axios"
import API_BASE_URL from "./Config"

const loginApi = async (payload) =>{
     try {
        const response = await axios.post(API_BASE_URL+'/api/auth/user/login',payload);
        const data = await response.data;
        return data;
     } catch (error) {
        console.error(error);
     }
}

export default loginApi;