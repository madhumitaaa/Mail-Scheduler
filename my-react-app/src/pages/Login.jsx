import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Login = () => {
const [formData,setFormData]=useState({email:'',password:''});
const [error,setError]=useState('');
const navigate=useNavigate();

const handleChange=e=>{
  setFormData({...formData,[e.target.name]:e.target.value});

};
const handleSubmit= async e=>{
  e.preventDefault();
  try{
  const res=await axios.post('http://localhost:5000/api/login',formData);
  if(res.status===200 && res.data)
  {
    navigate('/schedule');
  }}
  catch(err){
     console.error(err);
      setError('Invalid credentials. Please try again.');
  }

}

  return (
    <div>
       <Navbar />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
<button type="submit">Login</button>
  {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

      </form>
    <Link to="/register" className="auth-link">Don't have an account? Register</Link>
    </div>
  )
}

export default Login;
