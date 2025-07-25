import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Register.css'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Register = () => {
const [formData,setFormData]=useState({name:'',email:'',password:''});
const [error,setError]=useState('');
const navigate=useNavigate();
const handleChange=e=>{
  setFormData({...formData,[e.target.name]:e.target.value});

};
const handleSubmit= async e=>{
  e.preventDefault();
  try{
    console.log("Form Data: ", formData);
  const res=await axios.post('http://localhost:5000/api/register',formData, {
        headers: { 'Content-Type': 'application/json' }
      });
  if(res.status===200 || res.status===201)
  {
    navigate('/Login');
  }}
  catch(err){
  if (err.response) {
    console.error("Response error:", err.response.data);
    setError(err.response.data.message || 'Registration failed.');
  } else {
    console.error("Unknown error:", err.message);
    setError('An unexpected error occurred.');
  }
}
};

  return (
    <div>
       <Navbar />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
 <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
 />

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
required
/>
<button type="submit">Register</button>
  {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

      </form>
        <Link to="/login" className="auth-link">Login?</Link>
    </div>
  )
}

export default Register;
