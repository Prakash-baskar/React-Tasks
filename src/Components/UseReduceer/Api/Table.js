import { useEffect, useReducer, useState } from "react";
import { ReducerApi, datas } from "./Reducer";
import { apiGetById, apiGetMethod } from "../../Service/Api";
import { deleteData, editData, getData } from "./Action";
import { useNavigate } from "react-router-dom";

export const ReduerTableApi = ({ detail }) => {
    const [user, dispatch] = useReducer(ReducerApi, datas);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        const response = await apiGetMethod();
        dispatch(getData(response));
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        dispatch(deleteData(id));
        setTimeout(() => {
            fetchData();
        }, 400);
    };

    const handleEdit = async (id) => {
        setLoading(true);
        const response = await apiGetById(id);
        dispatch(editData(response));
        setLoading(false);
        navigate(`/reducerform/${id}`);
    };

    if (loading) {
        return <div className="loader"></div>;
    }

    return (
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
                <tbody>
                    {user.userData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.userName}</td>
                                <td>{value.userEmail}</td>
                                <td>{value.userPassword}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="edit"
                                        onClick={() => handleEdit(value.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="delete"
                                        onClick={() => handleDelete(value.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="backbt">
                <button className="back" onClick={() => navigate('/reducerform')}>Back</button>
            </div>
        </div>
    );
};
