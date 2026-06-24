# CourierHub 🚀

CourierHub is a full-stack courier service management platform designed with a modern **Glassmorphism** UI and built using the MERN stack.

## 🌟 Features

- **Modern Glassmorphism Design:** Beautiful, translucent UI elements with an animated gradient background.
- **User Dashboard:** Users can book couriers, track shipments in real-time, and view their booking history.
- **Admin Dashboard:** Admins can manage all bookings, update shipment statuses, and manage registered users (block/unblock).
- **Authentication:** Secure JWT-based authentication for both Users and Administrators.
- **Price Estimation:** Dynamic price calculation based on package weight, service type, and route.

## 🏗️ Project Structure

This project is organized as a monorepo:

- `frontend/` - React application built with Vite and Tailwind CSS.
- `backend/` - Node.js & Express API connected to MongoDB.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kunal-Kamod25/Project-Courier-Hub.git
   cd "Project-Courier-Hub/Courier Service Website"
   ```

2. **Install dependencies:**
   From the root folder, run:
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a `.env` file in the `backend/` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Run the Application:**
   Start both the frontend and backend concurrently from the root directory:
   ```bash
   npm start
   ```
   
   - **Frontend:** http://localhost:3000
   - **Backend:** http://localhost:5000

## 💻 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Tooling:** Concurrently (for monorepo execution)

## 🔐 Admin Access

To access the Admin panel, navigate to `/admin/login` and use your designated admin credentials.
