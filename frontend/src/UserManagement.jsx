import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/user/get_all_users');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched user data:', data);
          setUsers(data);
        } else {
          console.error('Error fetching user data:', response);
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAssignCoursesClick = () => {
    navigate('/assign-courses'); // Navigate to Assign Courses page
  };

  return (
    <div className="user_management">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            background-color: #f0f2f5;
            overflow-y: auto; /* Allows vertical scrolling */
          }

          .header {
            width: 100%;
            background-color: #D32F2F;
            color: white;
            padding: 15px 20px;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .terp-title {
            font-weight: bold;
            margin-right: auto;
          }

          .welcome-message {
            text-align: center;
            font-size: 18px;
            flex: 1;
          }

          .logo-container {
            text-align: center;
            margin-top: 20px;
          }

          .logo-container img {
            max-width: 200px;
            height: auto;
          }

          .table-container {
            margin: 20px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 18px;
          }

          table th, table td {
            padding: 15px;
            border: 1px solid #dddddd;
            text-align: center;
          }

          table th {
            background-color: #D32F2F;
            color: #ffffff;
          }

          table tr:nth-child(even) {
            background-color: #f5f5f5;
          }

          table tr:nth-child(odd) {
            background-color: #ffffff;
          }

          .assign-courses-card {
            margin: 20px;
            padding: 15px;
            border-radius: 8px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .assign-courses-card:hover {
            background-color: #45a049;
          }
        `}
      </style>

      <header className="header">
        <div className="terp-title">TerpEdu User Management</div>
        <div className="welcome-message">Hi {userName ? userName : 'User'}, Welcome back!</div>
      </header>

      <div className="logo-container">
        <img src="/TerpEdu.png" alt="TerpEdu Logo" />
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading user data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.UserID}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Role}</td>
                    <td>{user.DateCreated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="assign-courses-card" onClick={handleAssignCoursesClick}>
        Assign Courses
      </div>
    </div>
  );
}

export default UserManagement;
