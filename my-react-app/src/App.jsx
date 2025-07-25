import { useState } from 'react'
import {BrowserRouter as  Router ,Routes , Route ,Navigate }from 'react-router-dom'
import './App.css'
import Header from './components/header.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx';
import ScheduleEmail from './pages/ScheduleEmail';
function App() {
  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule" element={<ScheduleEmail />} />
         <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
     </Router>


    </>
  )
}

export default App;


