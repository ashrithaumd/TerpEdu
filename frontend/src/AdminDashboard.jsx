import React from 'react';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <style>
        {`
          body {
            margin: 0;
            width:10px;
            font-family: Arial, sans-serif;
          }

          .header {
            width: 100%;
            background-color: #d32f2f; /* Red color for header */
            color: white;
            padding: 20px;
            font-size: 24px;
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

          .welcome-message {
            font-weight: bold;
            margin-right: 20px;
          }

          .profile-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: url('https://via.placeholder.com/60') center/cover no-repeat; /* Replace with actual profile image */
          }

          .dashboard-content {
            background-color: #ffffff; /* White color for main content area */
            padding: 30px;
            min-height: calc(100vh - 100px);
          }

          .dashboard-card {
            background-color: #f5f5f5;
            padding: 20px;
            margin: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            display: inline-block;
            width: 200px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .dashboard-card img {
            width: 100px;
            height: auto;
            margin-bottom: 10px;
          }

          .dashboard-card-title {
            font-weight: bold;
            color: #d32f2f;
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
        <div className="dashboard-card">
          <img
            src="https://img.icons8.com/color/96/management.png"
            alt="User Management"
          />
          <div className="dashboard-card-title">USER MANAGEMENT</div>
        </div>

        <div className="dashboard-card">
          <img
            src="https://img.icons8.com/color/96/book-and-pencil.png"
            alt="Course Management"
          />
          <div className="dashboard-card-title">COURSE MANAGEMENT</div>
        </div>

        <div className="dashboard-card">
          <img
            src="https://img.icons8.com/color/96/megaphone.png"
            alt="Announcements and Alerts"
          />
          <div className="dashboard-card-title">ANNOUNCEMENTS AND ALERTS</div>
        </div>

        <div className="dashboard-card">
          <img
            src="https://img.icons8.com/color/96/graph-report.png"
            alt="Reports"
          />
          <div className="dashboard-card-title">REPORTS</div>
        </div>

        <div className="dashboard-card">
          <img
            src="https://img.icons8.com/color/96/settings.png"
            alt="System Settings"
          />
          <div className="dashboard-card-title">SYSTEM SETTINGS</div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
