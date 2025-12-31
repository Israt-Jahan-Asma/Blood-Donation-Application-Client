# 🩸 BloodLink – Blood Donation Management Platform

**BloodLink** is a role-based blood donation management web application that connects **donors**, **volunteers**, and **administrators** through a centralized dashboard. The platform allows users to create, manage, and track blood donation requests efficiently while maintaining strict role-based access control.

---

## 🔗 Live Project Links

- **Live Website:** https://blood-donation-application-react.netlify.app/
- **Server API:** https://blood-donation-application-server-sigma.vercel.app/

---

## 📸 Screenshot

![BloodLink Dashboard](https://i.ibb.co.com/Pv9xFpzF/3f559947-7722-4f97-849b-0573bb541074.png)

---

## 🛠️ Technologies Used

### Frontend
- React (Vite)
- React Router DOM
- Context API
- Tailwind CSS
- Lucide React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Hosting
- Firebase Authentication
- Netlify (Frontend Hosting)
- Vercel (Backend Hosting)

---

## ⭐ Core Features

### 🔐 Authentication & Authorization
- Secure login and registration using Firebase
- Role-based protected routes (Donor, Volunteer, Admin)

### 🩸 Donor Dashboard
- Create blood donation requests
- View recent and all donation requests
- Edit and delete own requests
- Update donation status (In Progress → Done / Canceled)
- Track donation history

### 🤝 Volunteer Dashboard
- View all blood donation requests
- Filter donation requests by status
- Update donation status only (restricted permissions)

### 🛠️ Admin Dashboard
- View platform statistics
- Manage all users
- Block / unblock users
- Assign roles (Donor → Volunteer → Admin)
- Manage all blood donation requests

---

## 👤 User Roles & Permissions

| Role | Permissions |
|-----|------------|
| **Donor** | Create, edit, delete own donation requests |
| **Volunteer** | View all requests, update donation status |
| **Admin** | Full access: manage users, roles, and requests |

---

## 🗂️ Dashboard Routes Overview

| Route | Description |
|------|------------|
| `/dashboard` | Dashboard Home |
| `/dashboard/my-donation-requests` | Donor’s Donation Requests |
| `/dashboard/create-donation-request` | Create New Donation Request |
| `/dashboard/all-users` | Admin – User Management |
| `/dashboard/all-blood-donation-request` | Admin & Volunteer Request Management |

---

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "firebase": "^10.x", 
  "lucide-react": "^0.x"
}

Backend Dependencies

express

cors

dotenv

mongodb

⚙️ How to Run the Project Locally
✅ Requirements

Node.js >= 18.x

npm >= 9.x

Git

1️⃣ Clone the repositories
git clone https://github.com/your-username/bloodlink-client.git
git clone https://github.com/your-username/bloodlink-server.git

2️⃣ Install dependencies
Frontend
cd bloodlink-client
npm install

Backend
cd bloodlink-server
npm install

3️⃣ Setup environment variables

Create a .env file in the server root directory:

DB_USER=bloodlink
DB_PASS=bloodlink


⚠️ Never commit .env files to GitHub

4️⃣ Run the backend server
npm run start

5️⃣ Run the frontend application
npm run dev

🌐 Access the application
Frontend: http://localhost:3000
Backend:  http://localhost:5000
