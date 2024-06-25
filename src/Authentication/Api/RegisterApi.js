import axios from "axios";
import API_BASE_URL from "./Config";

const registerFormApi = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/user/register`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        return { data: { message: "Registration failed. Please try again later." } };
    }
};

export default registerFormApi;

