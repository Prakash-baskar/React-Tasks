export  const datas = {
    userName:"",
    userEmail:"",
    userPassword:"",
    userData:[]
  }

 export function Reducer (state, action){
   switch (action.type) {
    case "userName":
       return{
        ...state,
        userName: action.payload
       };

    case "userEmail":
        return{
            ...state,
            userEmail: action.payload
        };
        
    case "userPassword":
        return{
            ...state,
            userPassword: action.payload
        };   
       
    case "submit":
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
            userName: "",
            userEmail: "",
            userPassword: "",
        };

    default:
        return state;
   }
}


 
