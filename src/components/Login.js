import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    let navigate = useNavigate();
    const [cred, setCred] = useState({email:"", password:""})
    const handleChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }
    const handleClick = async (e) => {
        e.preventDefault()
        
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
  return (
    <>
        <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </>
  )
}

export default Login