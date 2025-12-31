🩸 BloodLink – Blood Donation Management Platform

BloodLink is a role-based blood donation management system that connects donors, volunteers, and administrators through a centralized dashboard. It enables users to create, manage, and track blood donation requests efficiently while ensuring proper access control and transparency.

📸 Screenshot

Dashboard Preview
<img width="1920" height="3881" alt="59dee00d-3dd4-4202-8b9b-29b232510395" src="https://i.ibb.co.com/Pv9xFpzF/3f559947-7722-4f97-849b-0573bb541074.png" />


🚀 Live Project

Live Website: https://blood-donation-application-react.netlify.app/

🧰 Technologies Used
Frontend

React (Vite)
React Router DOM
Context API
Tailwind CSS
Lucide React Icons
Axios
Backend
Node.js
Express.js
MongoDB

Firebase Authentication

⭐ Core Features
🔐 Authentication & Authorization

Secure login and registration

Role-based protected routes (Admin, Donor, Volunteer)

🩸 Donor Dashboard

Create blood donation requests
View recent and all donation requests
Edit, delete, and update donation status
Track donation progress

🤝 Volunteer Dashboard

View all donation requests
Update donation status only

🛠️ Admin Dashboard

View platform statistics
Manage all users
Block/unblock users
Assign roles (Donor → Volunteer → Admin)

📦 Dependencies Used
"dependencies": {
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "firebase": "^10.x",
  "lucide-react": "^0.x"
}

⚙️ How to Run the Project Locally
1️⃣ Clone the repositories
git clone https://github.com/your-username/bloodlink-client.git
git clone https://github.com/your-username/bloodlink-server.git

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the server root:

DB_USER=bloodlink
DB_PASS=bloodlink


⚠️ Do not push .env files to GitHub.

4️⃣ Run the backend
npm run start

5️⃣ Run the frontend
npm run dev


Frontend will run at:

http://localhost:3000

Manage all donation requests
