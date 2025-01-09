import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { user , handleUserLogin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => handleUserLogin(e, credentials)}>
          <div className="field--wrapper">
            <label htmlFor="">Email</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email......"
              value={credentials.email}
              onChange={(e) => {handleInputChange(e)}}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="">Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => {handleInputChange(e)}}
            />
          </div>
          <div className="field--wrapper">
          <input className="btn btn--lg btn--main" type="submit" value='Login' />
          </div>
        </form>

        <p>Dont have an account? Register <Link to="/signup">here</Link></p>
      </div>
    </div>
  );
};

export default Login;
