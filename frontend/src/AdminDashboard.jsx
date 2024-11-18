import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin_dashboard">
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f2f5; 
          }

          .header {
            width: 100%;
            background-color: #d32f2f; 
            color: white;
            padding: 20px;
            font-size: 28px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
          }

          .header-logo {
            display: flex;
            align-items: center;
          }

          .header-logo img {
            width: 80px;
            height: auto;
            margin-right: 20px;
          }

          .header-logo h1 {
            font-size: 32px;
          }

          .welcome-message {
            font-weight: bold;
            margin-right: 20px;
            font-size: 20px;
          }

          .profile-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: url('https://via.placeholder.com/60') center/cover no-repeat;
          }

          .dashboard-content {
            padding: 40px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }

          .dashboard-card {
            background-color: #ffffff;
            padding: 40px;
            margin: 20px;
            border-radius: 15px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .dashboard-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
          }

          .dashboard-card img {
            width: 120px;
            height: auto;
            margin-bottom: 20px;
          }

          .dashboard-card-title {
            font-weight: bold;
            font-size: 22px;
            color: #333;
          }
        `}
      </style>

      <header className="header">
        <div className="header-logo">
          <img src="/TerpEdu.png" alt="TerpEdu Logo" />
          <h1>ADMIN DASHBOARD</h1>
        </div>
        <div className="welcome-message">Hi [Name], Welcome back!</div>
        <div className="profile-icon"></div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-card" onClick={() => navigate('/user-management')}>
          <img
            src="https://img.icons8.com/color/120/management.png"
            alt="User Management"
          />
          <div className="dashboard-card-title">USER MANAGEMENT</div>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/course-management')}>
          <img
            src="https://img.icons8.com/color/120/book-and-pencil.png"
            alt="Course Management"
          />
          <div className="dashboard-card-title">COURSE MANAGEMENT</div>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/announcements-alerts')}>
          <img
            src="https://img.icons8.com/color/120/megaphone.png"
            alt="Announcements and Alerts"
          />
          <div className="dashboard-card-title">ANNOUNCEMENTS AND ALERTS</div>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/reports')}>
          <img
            src="https://img.icons8.com/color/120/graph-report.png"
            alt="Reports"
          />
          <div className="dashboard-card-title">REPORTS</div>
        </div>

        
      </main>
    </div>
  );
}

export default AdminDashboard;
