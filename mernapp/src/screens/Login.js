import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      //save the auth to local storage and redirect
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");

    }



  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>New user</Link>
        </form>
      </div>


    </div>
  )
}
