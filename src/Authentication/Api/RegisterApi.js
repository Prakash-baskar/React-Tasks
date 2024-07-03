import axios from "axios";
import API_BASE_URL from "./Config";

const registerFormApi = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/user/register`, payload);
        return response.data.data;
    } catch (error) {
        const response = error.response; 
        return response.data;
    }
};

export default registerFormApi;

