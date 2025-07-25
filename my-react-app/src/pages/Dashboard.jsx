// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Navbar from '../components/Navbar';
const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');

  const fetchEmails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/emails', {
        withCredentials: true
      });
      setEmails(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch scheduled emails.');
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="dashboard-container">
         <Navbar />
      <h2>Your Scheduled Emails</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="email-list">
        {emails.length === 0 ? (
          <p>No emails scheduled yet.</p>
        ) : (
          emails.map((email, index) => (
            <div key={index} className="email-card">
              <p><strong>To:</strong> {email.to}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
              <p><strong>Message:</strong> {email.message}</p>
              <p><strong>Date:</strong> {email.date}</p>
              <p><strong>Time:</strong> {email.time}</p>
              <p><strong>Status:</strong> {email.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

