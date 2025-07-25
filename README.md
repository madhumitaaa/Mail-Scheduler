# 📧 Email Scheduler using Node.js, MongoDB, and Nodemailer

A backend-only project that allows users to **schedule emails for future delivery**. The app stores email details in MongoDB and uses a background worker (`emailDispatcher.js`) to check every minute and send due emails using Nodemailer via Gmail SMTP. All email attempts (success or failure) are logged for transparency.

---

## 🚀 Features

- 📆 Schedule emails to be sent at a specific date and time
- 📤 Automatically sends due emails using Gmail SMTP
- ✅ Logs successful email deliveries
- ❌ Logs failed delivery attempts with error messages
- 🔄 Background job runs every minute to check for due emails

---

## 🛠️ Tech Stack

| Technology | Purpose                    |
|------------|----------------------------|
| Node.js    | Backend runtime environment |
| Express.js | API server                 |
| MongoDB    | Database to store emails and logs |
| Mongoose   | ODM for MongoDB            |
| Nodemailer | Email delivery (Gmail)     |
| dotenv     | Secure environment config  |

---

## 📁 Folder Structure

