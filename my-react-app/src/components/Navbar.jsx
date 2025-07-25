// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className='p1'><Link to="/schedule">Schedule Mail</Link></li>
        <li className='p2'><Link to="/dashboard">Dashboard</Link></li>
        <li className='p3'><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
