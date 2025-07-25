const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  message: String,
  scheduledTime: Date,
  sent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Email', emailSchema);
