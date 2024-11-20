// import React from 'react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AdminDashboard() {
  const { user_name } = useParams();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };

  // Handle logout functionality (e.g., clearing session or redirecting)
  const handleLogout = () => {
    console.log('Logging out');
    navigate('/'); // Example of redirecting to login page
  };


  return (
    <div className="admin_dashboard">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            background-color: #f0f2f5;
            overflow: hidden;
          }

          .header {
          background-color: #D32F2F;
          color: white;
          height: 70px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          font-family: 'Open Sans', sans-serif;
          font-weight: bold;
          font-size: 22px;
          position: relative;
        }

          .header .title {
            display: flex;
            align-items: center;
            font-size: 24px;
          }

          .header .title span {
            margin-left: 10px;
            font-weight: bold;
            font-size: 28px;
          }

          .welcome-message {
            margin: 0 auto;
            font-size: 18px;
          }
          
          .profile-icon {
          font-size: 20px;
          position: absolute;
          right: 20px;
          cursor: pointer;

        }
        
         .dropdown {
          position: absolute;
          right: 20px;
          top: 50px; /* Position below the icon */
          background-color: red;
          border: 1px solid #ccc;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          z-index: 10;
          width: 100px;
          text-align: center;
          display: ${dropdownVisible ? 'block' : 'none'};
        }

        .dropdown button {
          padding: 10px;
          background-color: #D32F2F;
          color: white;
          border: none;
          width: 100%;
          cursor: pointer;
        }

        .dropdown button:hover {
          background-color: #b71c1c;
        }

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

          .dashboard-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            padding: 10px 20px;
            box-sizing: border-box;
          }

          .dashboard-card {
            background-color: rgba(255, 255, 255, 0.8);
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
            transition: transform 0.3s, box-shadow 0.3s;
            overflow: hidden;
          }

          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .card-top {
            width: 100%;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #D32F2F;
            color: white;
          }

          .card-top.grey {
            background-color: #BFBFBF;
          }

          .dashboard-card img {
            width: 50px;
            height: auto;
          }

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

          .turtle-image {
            position: fixed;
            right: 0;
            bottom: 0;
            max-width: 400px;
            opacity: 0.3;
            z-index: -1;
          }
        `}
      </style>

      <header className="header">
        <div className="title">
          <span>TerpEdu</span>
        </div>
        <div className="welcome-message">Hi {user_name}, Welcome back!</div>
        <div className="profile-icon" onClick={handleProfileClick}>
            👤
            {dropdownVisible && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
      </header>

      <div className="logo-container">
        <img src="/TerpEdu.png" alt="TerpEdu Logo" />
      </div>

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

      <img src="/turtle.png" alt="Turtle" className="turtle-image" />
    </div>
  );
}

export default AdminDashboard;
