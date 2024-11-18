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
          console.log('Fetched user data:', data); // Debugging statement
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
    // fetchUserName();
  }, []);

  const handleAssignCoursesClick = () => {
    navigate('/assign-courses'); // Navigate to Assign Courses page
  };

  return (
    <div className="user_management">
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }
          .header {
            width: 100%;
            background-color: #d32f2f;
            color: white;
            padding: 20px;
            font-size: 24px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
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
            font-size: 18px; /* Increased font size */
          }
          table th, table td {
            padding: 15px;
            border: 1px solid #dddddd;
            text-align: center;
          }
          table th {
            background-color: #f2a65a;
            color: #ffffff;
          }
          .assign-courses-card {
            margin: 20px;
            padding: 20px;
            border-radius: 8px;
            background-color: #1976d2;
            color: white;
            text-align: center;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <header className="header">
        <div className="header-logo">
          <img src="/TerpEdu.png" alt="TerpEdu Logo" />
          <h1>USER MANAGEMENT</h1>
        </div>
        <div className="welcome-message">Hi {userName ? userName : 'User'}, Welcome back!</div>
        <div className="profile-icon"></div>
      </header>

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
