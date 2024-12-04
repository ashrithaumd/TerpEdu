import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './chatbot/chatbot.css'; // Import chatbot styling
import { loadInitialSuggestions, sendMessage } from './chatbot/chatbot.js';

function StudentDashboard() {
  const { user_name } = useParams(); // Extracts user_name from URL parameters
  const navigate = useNavigate(); // React Router hook for navigation
  const [userID, setUserID] = useState(localStorage.getItem('user_id')); // State to store student ID
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State to store enrolled courses
  const [availableCourses, setAvailableCourses] = useState([]); // State to store available courses
  const [error, setError] = useState(''); // State to store any errors
  const [showChatbot, setShowChatbot] = useState(false); // Chatbot visibility state

  // Logout functionality
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate('/'); // Redirect to the login page
  };

  // Chatbot toggle
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/student/dashboard/${userID}`);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      setEnrolledCourses(data.enrolled_courses || []);
      setAvailableCourses(data.available_courses || []);
    } catch (error) {
      setError('Failed to load data. Please try again.');
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Dynamically load chatbot CSS and JS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/chatbot.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = '/chatbot.js';
    script.async = true;

    script.onload = () => {
      if (typeof loadInitialSuggestions === 'function') {
        loadInitialSuggestions();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* CSS Styling */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          background-color: #f9f9f9;
        }

        .header {
          background-color: #D32F2F;
          color: white;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          font-weight: bold;
          font-size: 22px;
        }

        .logout-icon {
          cursor: pointer;
          font-size: 24px;
        }

        .navbar {
          display: flex;
          justify-content: space-around;
          background-color: #424242;
          color: white;
          padding: 10px;
          font-size: 16px;
          font-weight: bold;
        }

        .navbar span {
          cursor: pointer;
          padding: 10px 15px;
        }

        .navbar span + span {
          border-left: 1px solid white;
          padding-left: 15px;
        }

        .dashboard-container {
          max-width: 800px;
          margin: 40px auto;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .dashboard-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-image: url('/full_turtle.png');
          background-size: 35%; /* Adjusted turtle size */
          background-repeat: no-repeat;
          opacity: 0.15;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .dashboard-content {
          position: relative;
          z-index: 1;
          text-align: left;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 20px;
          margin: 20px 0 10px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 18px;
        }

        li {
          margin: 5px 0;
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          gap: 20px; /* Equal spacing between elements */
        }

        button {
          padding: 10px 20px;
          background-color: #D32F2F;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #b71c1c;
        }

        select {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          flex: 1;
        }

        .chatbot-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .chatbot-container {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 400px;
          max-height: 500px;
          overflow: hidden;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Header Section */}
      <div className="header">
        <span>TerpEdu - Student Dashboard</span>
        <span className="logout-icon" onClick={handleLogout}>👤</span>
      </div>

      {/* Navbar Section */}
      <div className="navbar">
        <span onClick={() => navigate('/inbox')}>Inbox</span>
        <span onClick={() => navigate('/announcements')}>Announcements</span>
        <span onClick={() => navigate('/uploaded_materials_student')}>Uploaded Materials</span>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2>Student Dashboard</h2>
          <h3>Enrolled Courses</h3>
          <ul>
            {enrolledCourses.map((course) => (
              <li key={course.course_id}>{course.course_name} (Course ID: {course.course_id})</li>
            ))}
          </ul>

          <h3>Available Courses</h3>
          <ul>
            {availableCourses.map((course) => (
              <li key={course.course_id}>{course.course_name} (Course ID: {course.course_id})</li>
            ))}
          </ul>

          <div className="action-buttons">
            <select>
              <option value="">Select a course to add</option>
              {availableCourses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
            <button>Add</button>
            <select>
              <option value="">Select a course to drop</option>
              {enrolledCourses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
            <button>Drop</button>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        <img src="/chatbot-icon2.gif" alt="Chatbot" style={{ width: '120px', height: '90px' }} />
      </button>

      {/* Chatbot Component */}
      {showChatbot && (
        <div className="chatbot-container">
          <div id="chatbox">
            <div className="chatbot-header">TerpEdu Buddy</div>
            <div id="chat-messages">
              <div className="bot-message">
                <div className="message">Welcome to TerpEdu! I am TerpEdu Buddy.</div>
              </div>
              <div id="suggestion-buttons" className="suggestions"></div>
            </div>
            <div className="chatbot-footer">
              <input id="user-input" type="text" placeholder="Ask a question..." />
              <button id="send-btn">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
