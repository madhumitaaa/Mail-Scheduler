import React, { useState } from 'react';
import axios from 'axios';
import './ScheduleEmail.css';
import Navbar from '../components/Navbar.jsx';

const ScheduleEmail = () => {
  const [form, setForm] = useState({
    to: '',
    subject: '',
    message: '',
    datetime: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const scheduledTime = new Date(form.datetime);

    try {
      await axios.post('http://localhost:5000/api/schedule', {
        to: form.to,
        subject: form.subject,
        message: form.message,
        scheduledTime: scheduledTime.toISOString(),
      });
      alert("Email scheduled successfully!");
    } catch (err) {
      console.error(err);
      alert("Error scheduling email.");
    }
  };

  // Get minimum allowed datetime (current local time)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // correct timezone
    return now.toISOString().slice(0, 16); // format for datetime-local input
  };

  return (
    <div className="schedule-mail-container">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Schedule an Email</h2>

        <input type="email" name="to" placeholder="To" onChange={handleChange} required />
        <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
        <textarea className="message" name="message" placeholder="Message" onChange={handleChange}></textarea>

        <label>Select Date & Time:</label>
        <input
          type="datetime-local"
          name="datetime"
          value={form.datetime || getMinDateTime()}
          onChange={handleChange}
          min={getMinDateTime()}
          required
        />

        <button type="submit">Schedule Email</button>
      </form>
    </div>
  );
};

export default ScheduleEmail;

