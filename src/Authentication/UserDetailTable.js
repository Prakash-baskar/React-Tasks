


export const DataTable = () =>{
      
   

    return(
       <div>
          <table>
            <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
            <tbody>
            {(() => {
                        return (
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button
                                        type="button"
                                        className="edit"
                                       
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="delete"
                                        
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
       </div>
    );
};

export default DataTable