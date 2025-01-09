import React,{useState} from 'react'
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const {handleSignUp} = useAuth()
  const [credentials, setCredentials] = useState({
      name:"",
      email: "",
      password: "",
      password2: ""
    })
    const handleInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setCredentials({ ...credentials, [name]: value });
    };
  return (
    <div className="auth--container">
    <div className="form--wrapper">
      <form onSubmit={(e) => handleSignUp(e, credentials)}>
        <div className="field--wrapper">
          <label htmlFor="">Name</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Enter your Name"
            value={credentials.name}
            onChange={(e) => {handleInputChange(e)}}
          />
        </div>
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
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            required
            name="password2"
            placeholder="Confirm password"
            value={credentials.password2}
            onChange={(e) => {handleInputChange(e)}}
          />
        </div>
        <div className="field--wrapper">
        <input className="btn btn--lg btn--main" type="submit" value='Register' />
        </div>
      </form>
      <p>Already have an account? Login <Link to="/login">here</Link></p>
    </div>
  </div>
  )
}

export default SignUp