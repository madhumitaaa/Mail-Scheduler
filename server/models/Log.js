const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  to: String,
  subject: String,
  message: String,
  status: {
    type: String,
    enum: ['Success', 'Failed'],
    required: true,
  },
  error: String, 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Log', logSchema);
