
import { ADD_ITEM, ADD_USER_EMAIL, ADD_USER_NAME, ADD_USER_PASSWORD, DELETE_DATA, EDIT_DATA, GET_DATA } from "./Type";

export const datas ={
   userName:"",
   userEmail:"",
   userPassword:"",
   userData:[]
}

export function ReducerApi(state,action) {
    switch (action.type) {
        case ADD_USER_NAME:
            return{
               ...state,
               userName: action.payload
            };
        
        case ADD_USER_EMAIL:
            return{
                ...state,
                userEmail: action.payload
            } 
         
        case ADD_USER_PASSWORD:    
            return{
                ...state,
                userPassword: action.payload 
            }

        case ADD_ITEM:
            return{
                ...state,
                userData: [
                    ...state.userData,
                    {
                        userName: state.userName,
                        userEmail: state.userEmail,
                        userPassword: state.userPassword
                    }
                ],

                userName:"",
                userEmail:"",
                userPassword:"",
            }; 
        case GET_DATA:
            return {
                ...state,
                userData:[
                    ...action.payload
                ]
            } 
        case DELETE_DATA:
            return{
                ...state,
                userData: state.userData.filter((_,index) =>index !== action.payload)
            }

        case EDIT_DATA:
            return{
                ...state,
                userName:action.payload.userName,
                userEmail:action.payload.userEmail,
                userPassword:action.payload.userPassword,
            } 
         
           
        default:
            return state;
    }
    
}