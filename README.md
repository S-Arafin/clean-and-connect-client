# 🌍 CleanConnect - Community Issue Tracker

**Live Site:** https://clean-and-connect.web.app/

**CleanConnect** is a full-stack MERN (MongoDB, Express, React, Node) application designed to empower communities. It allows citizens to report local environmental issues—such as garbage buildup, road damage, or illegal construction—and track their resolution. Users can contribute funds to solve issues, track their impact, and download reports.

---

## 🚀 Key Features

* **Secure Authentication:** Robust user login and registration system using **Firebase** (Email/Password & Google Social Login) with JWT-secured private routes.
* **Real-time Issue Reporting:** Logged-in users can report issues with details like location, category (Garbage, Potholes, etc.), images, and estimated budgets.
* **Smart Status Tracking:** Issues are tracked from "Open" to "Resolved." The system **automatically marks an issue as Resolved** when user donations meet the required budget.
* **Contribution System & Reports:** Users can donate to specific causes via a secure modal. A "Download Report" feature uses **jsPDF** to generate a professional PDF summary of all user contributions.
* **Dynamic Dashboard:** Personalized "My Issues" and "My Contributions" pages allow users to manage their reports (Update/Delete) and view their donation history.
* **Responsive & Interactive UI:** Built with **Tailwind CSS** and **DaisyUI**, featuring Dark/Light mode toggle, smooth animations (Framer Motion), and a responsive grid layout.

---

## 🛠️ Technologies Used

### Frontend (Client)
* **React.js (Vite):** Fast, modern UI library.
* **Tailwind CSS & DaisyUI:** For rapid, responsive, and thematic styling.
* **Firebase Authentication:** Secure user identity management.
* **Axios:** For handling HTTP requests to the backend.
* **Framer Motion:** For smooth page transitions and banner animations.
* **jsPDF & AutoTable:** For generating downloadable PDF reports.
* **React Toastify & SweetAlert2:** For user notifications and confirmation alerts.

### Backend (Server)
* **Node.js & Express.js:** RESTful API architecture.
* **MongoDB (Atlas):** NoSQL database for storing users, issues, and contributions.
* **Cors & Dotenv:** Middleware for security and environment variable management.

---
