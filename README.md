# Admin Analytics Dashboard

A full-stack web application that allows admin users to log in securely and manage analytics data (add/view analytics entries). Built with **React.js**, **Node.js**, **Express.js**, and **MySQL**.

---

## 🔧 Features

- ✅ Admin authentication using JWT
- ✅ Protected API routes
- ✅ Add new analytics data
- ✅ Paginated analytics data view with optional filtering
- ✅ Secure password hashing with bcrypt
- ✅ Clean frontend form and UI

---

## 📁 Project Structure

AdminAnalyticsDashboard/
│
├── backend/
│ ├── config/
│ │ └── db.js # MySQL connection setup
│ ├── routes/
│ │ ├── authRoutes.js # Login and analytics APIs
│ │ └── dataRoutes.js # (if separated)
│ ├── .env # Environment variables (JWT_SECRET, DB config)
│ ├── index.js # Main server file
│ └── package.json # Backend dependencies
│
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ └── AddAnalytics.js
│ │ ├── context/
│ │ │ └── AuthContext.js
│ │ ├── pages/
│ │ │ └── LoginPage.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── styles.css
│ └── package.json # Frontend dependencies
│
└── README.md # Project documentation

---

🌐 Frontend

### Built With:
- React.js (hooks & context)
- Axios for API calls

### To Run:
cd frontend
npm install
npm start

🔐 Backend
Built With:
Node.js
Express.js
MySQL (using mysql2)
JWT for authentication
bcrypt for secure passwords

To Run:
cd backend
npm install
node index.js

Make sure to configure your .env file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=analytics_db
JWT_SECRET=yourjwtsecret

📦 Database Schema (MySQL)
Table: admins
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

Table: analytics
CREATE TABLE analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🔑 Default Admin Credentials (optional for testing)
Email: goravadmin@gmail.com
Password: gorav123 (store hashed using bcrypt)

🚀 Future Improvements
UI Enhancements with charts/graphs
Admin registration page
Full CRUD operations on analytics
Export analytics to CSV or PDF

👨‍💻 Author
Made with ❤️ by Gorav Gumber(me)