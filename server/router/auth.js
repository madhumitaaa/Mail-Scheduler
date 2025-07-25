const express = require('express');
const {
  loginUser,
  registerUser,
  scheduleEmail,
  getEmailLogs 
} = require('../controllers/autocontrollers.js');

const router = express.Router();


router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/schedule', scheduleEmail);
router.get('/logs', getEmailLogs); 

module.exports = router;
