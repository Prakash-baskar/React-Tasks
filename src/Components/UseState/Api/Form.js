import { useEffect, useState } from "react";
import { apiGetById, apiPostMethod, apiPutMethod } from "../../Service/Api";
import { useNavigate, useParams } from "react-router-dom";

const FormApi = () => {
  const navigate = useNavigate();
  const urlParams = useParams();

  const [user, setUser] = useState({
    userEmail: '',
    userPassword: '',
    userName: '',
    userPhone: '',
  });

  const [errors, setErrors] = useState({});

  async function fetchData(id) {
    const data = await apiGetById(id);
    setUser({
      ...user,
      userEmail: data.userEmail,
      userPassword: data.userPassword,
      userName: data.userName,
      userPhone: data.userPhone,
    });
  }

  useEffect(() => {
    if (urlParams.id !== undefined) {
      fetchData(urlParams.id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!user.userName) newErrors.userName = "Name is required";
    if (!user.userEmail) {
      newErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.userEmail)) {
      newErrors.userEmail = "Email is invalid";
    }
    if (!user.userPhone) {
      newErrors.userPhone = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.userPhone)) {
      newErrors.userPhone = "Phone number is invalid";
    }
    if (!user.userPassword) newErrors.userPassword = "Password is required.";
      else if (!/^\d{5}$/.test(user.userPassword)) {
        newErrors.userPassword = "Password must be 5 digit number.";
      }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      if (urlParams.id !== undefined) {
        apiPutMethod(urlParams.id, user);
      } else {
        apiPostMethod(user);
      }
      navigate('/tableapi');
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div>
      <div className='head'>
        <form onSubmit={handleSubmit}>
          <span><h2>UseState Api</h2></span>
          <div className='manageinput'>
            <label>Name</label>
            <input value={user.userName} name="userName" onChange={handleChange} />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>
          <div className='manageinput'>
            <label>Email</label>
            <input value={user.userEmail} name="userEmail" onChange={handleChange} />
            {errors.userEmail && <p className="error">{errors.userEmail}</p>}
          </div>
          <div className='manageinput'>
            <label>Phone Number</label>
            <input value={user.userPhone} name="userPhone" onChange={handleChange} />
            {errors.userPhone && <p className="error">{errors.userPhone}</p>}
          </div>
          <div className='manageinput'>
            <label>Password</label>
            <input value={user.userPassword} name="userPassword" onChange={handleChange} />
            {errors.userPassword && <p className="error">{errors.userPassword}</p>}
          </div>
          <div className="btn">
            <button className="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormApi;

