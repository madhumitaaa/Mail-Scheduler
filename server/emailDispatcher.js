require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Email = require('./models/Emails.js');
const Log = require('./models/Log.js'); 

mongoose.connect('mongodb://localhost:27017/schedulemailer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter failed:', error);
  } else {
    console.log('✅ Email transporter is ready');
  }
});

const sendScheduledEmails = async () => {
  try {
    const now = new Date();
    const emailsToSend = await Email.find({
      scheduledTime: { $lte: now },
      sent: false,
    });

    for (const email of emailsToSend) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email.to,
          subject: email.subject,
          text: email.message,
        });

        email.sent = true;
        await email.save();

        // ✅ Log success
        await Log.create({
          to: email.to,
          subject: email.subject,
          message: email.message,
          status: 'Success',
        });

        console.log(`✅ Email sent to ${email.to}`);
      } catch (err) {
        console.error(`❌ Failed to send to ${email.to}`, err.message);

        // ❌ Log failure
        await Log.create({
          to: email.to,
          subject: email.subject,
          message: email.message,
          status: 'Failed',
          error: err.message,
        });
      }
    }
  } catch (error) {
    console.error('❌ Error in scheduled job:', error.message);
  }
};

setInterval(sendScheduledEmails, 60 * 1000);
/*{
  "to": "abc@gmail.com",
  "subject": "Hello",
  "message": "This is scheduled",
  "scheduledTime": "2025-07-22T08:30:00.000Z"
}
*/