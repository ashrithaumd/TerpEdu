import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AdminDashboard() {
  // Extract user_name from URL parameters using useParams hook
  const { user_name } = useParams();
  const navigate = useNavigate();

  return (
    <div className="admin_dashboard">
      <style>
        {`
          /* Importing custom Google font */
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

          
          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            background-color: #f0f2f5;
            overflow: hidden; /* Prevents both horizontal and vertical scrolling */
          }

          /* Header styling */
          .header {
            width: 100%;
            background-color: #D32F2F; /* Red background for header */
            color: white;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            font-size: 18px;
          }

          /* Styling for the header title section */
          .header .title {
            display: flex;
            align-items: center;
            font-size: 24px;
          }

          .header .title span {
            margin-left: 10px;
            font-weight: bold;
            font-size: 28px; /* Larger font size for the title */
          }

          /* Styling for the welcome message */
          .welcome-message {
            margin: 0 auto;
            font-size: 18px;
          }

          /* Logo container styling */
          .logo-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 10px;
          }

          .logo-container img {
            max-width: 300px;
            width: 100%;
            height: auto;
          }

          /* Dashboard content container styling */
          .dashboard-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            padding: 10px 20px;
            box-sizing: border-box;
          }

          /* Card styling for dashboard items */
          .dashboard-card {
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
            padding: 0;
            margin: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200px;
            height: 300px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s; /* Transition for hover effect */
            overflow: hidden; /* Ensures content does not overflow */
          }

          /* Hover effect for cards */
          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          /* Card top section styling for icons */
          .card-top {
            width: 100%;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #D32F2F; /* Default red color for card tops */
            color: white;
          }

          /* Grey background for alternating cards */
          .card-top.grey {
            background-color: #BFBFBF;
          }

          .dashboard-card img {
            width: 50px;
            height: auto;
          }

          /* Card bottom section styling for text */
          .card-bottom {
            width: 100%;
            padding: 10px;
            background-color: white;
            text-align: center;
          }

          .dashboard-card-title {
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin: 5px 0 0 0;
          }

          /* Turtle image styling for background display */
          .turtle-image {
            position: fixed;
            right: 0;
            bottom: 0;
            max-width: 400px;
            opacity: 0.3; /* Adjust transparency for subtle appearance */
            z-index: -1; /* Ensures it's behind content */
          }
        `}
      </style>

      {/* Header section with title and welcome message */}
      <header className="header">
        <div className="title">
          <span>TerpEdu</span> {/* Static title */}
        </div>
        <div className="welcome-message">Hi {user_name}, Welcome back!</div> {/* Welcome message */}
      </header>

      {/* Logo container with centered image */}
      <div className="logo-container">
        <img src="/TerpEdu.png" alt="TerpEdu Logo" />
      </div>

      {/* Dashboard cards for navigation of Admin Dashboard */}
      <main className="dashboard-content">
        <div className="dashboard-card" onClick={() => navigate('/user-management')}>
          <div className="card-top">
            <img src="https://img.icons8.com/pulsar-color/48/commercial-development-management.png" alt="User Management" />
          </div>
          <div className="card-bottom">
            <div className="dashboard-card-title">USER MANAGEMENT</div>
          </div>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/course-management')}>
          <div className="card-top grey">
            <img src="https://img.icons8.com/color/80/book-and-pencil.png" alt="Course Management" />
          </div>
          <div className="card-bottom">
            <div className="dashboard-card-title">COURSE MANAGEMENT</div>
          </div>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/announcements-alerts')}>
          <div className="card-top">
            <img src="https://img.icons8.com/color/80/megaphone.png" alt="Announcements and Alerts" />
          </div>
          <div className="card-bottom">
            <div className="dashboard-card-title">ANNOUNCEMENTS AND ALERTS</div>
          </div>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/reports')}>
          <div className="card-top grey">
            <img src="https://img.icons8.com/color/80/graph-report.png" alt="Reports" />
          </div>
          <div className="card-bottom">
            <div className="dashboard-card-title">REPORTS</div>
          </div>
        </div>
      </main>

      {/* For turtle image in the background */}
      <img src="/turtle.png" alt="Turtle" className="turtle-image" />
    </div>
  );
}

export default AdminDashboard;
