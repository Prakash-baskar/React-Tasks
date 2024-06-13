import React from 'react' 

export const UseReducerTable = ({detail,dispatch}) => {
    console.log(detail);
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
            </tr>
        </thead>
        <tbody>
            { detail.userData.map((value, index) =>{
               return(
                <tr key={index}>
                <td>{value.userName}</td>
                <td>{value.userEmail}</td>
                <td>{value.userPassword}</td>
            </tr>
               )
            })
            }
        </tbody>
      </table>
    </div>
  )
}


