import axios from "axios";
import API_BASE_URL from "./Config";



const userData = async (payload) =>{
    try {
        const response = await axios.get(API_BASE_URL+`/api/user/getUser/{useremail}`,{
           
            
        });
        return response
    } catch (error) {
        console.error(error);
    }
}

export default userData;