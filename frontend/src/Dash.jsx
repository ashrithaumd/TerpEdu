import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./chatbot/chatbot.css"; // Import chatbot styling
import { loadInitialSuggestions, sendMessage } from './chatbot/chatbot.js';

function Dash() {
  const { user_name } = useParams(); // Extracts user_name from URL parameters
  const navigate = useNavigate(); // React Router hook for navigation
  const [instructorId, setInstructorId] = useState(localStorage.getItem("user_id")); // State to store instructor ID input
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(''); // State to store any errors
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [showChatbot, setShowChatbot] = useState(false); // Chatbot visibility state

  const toggleChatbot = () => {
    console.log("Chatbot visibility toggled:", !showChatbot);
    setShowChatbot(!showChatbot);
  };

  // Fetch courses based on instructor ID
  const handleFetchCourses = async () => {
    if (!instructorId) {
      setError('Please enter a valid instructor ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/inst/get_courses_by_inst/${instructorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data); // Sets fetched courses
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to a new path
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle navigation on course card click
  const handleCourseClick = (course) => {
    const { course_ID, name, description, department } = course;
    navigate(`/get_course/${course_ID}/${encodeURIComponent(name)}/${encodeURIComponent(description)}/${encodeURIComponent(department)}/${instructorId}`);
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };

  // Handle logout functionality (e.g., clearing session or redirecting)
  const handleLogout = () => {
    console.log('Logging out');
    navigate('/'); // Example of redirecting to login page
  };

  useEffect(() => {
      handleFetchCourses();
    // Dynamically load CSS for the chatbot
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/chatbot/chatbot.css";
    document.head.appendChild(link);

    // Dynamically load JS for the chatbot
    const script = document.createElement("script");
    script.src = "/chatbot/chatbot.js";
    script.async = true;

    // Ensure the script is only executed after it has loaded
    script.onload = () => {
        console.log("Chatbot script loaded successfully");
        if (typeof loadInitialSuggestions === "function") {
            loadInitialSuggestions(); // Call the function from chatbot.js to initialize suggestions
        }
    };

    script.onerror = () => {
        console.error("Failed to load chatbot script");
    };

    document.body.appendChild(script);

    // Handle event listeners for the chatbot when it is shown
    if (showChatbot) {
        const sendButton = document.getElementById("send-btn");
        const userInput = document.getElementById("user-input");

        const handleSend = () => sendMessage();
        const handleKeyPress = (e) => {
            if (e.key === "Enter") sendMessage();
        };

        if (sendButton && userInput) {
            sendButton.addEventListener("click", handleSend);
            userInput.addEventListener("keypress", handleKeyPress);
        }

        // Cleanup event listeners
        return () => {
            if (sendButton && userInput) {
                sendButton.removeEventListener("click", handleSend);
                userInput.removeEventListener("keypress", handleKeyPress);
            }
        };
    }

    // Cleanup function to remove dynamically added CSS and JS files
    return () => {
        if (link.parentNode) {
            document.head.removeChild(link);
        }
        if (script.parentNode) {
            document.body.removeChild(script);
        }
      };
    }, [showChatbot]);

  return (
    <div>
      {/* CSS styling for the component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;300&display=swap');

        body {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          background-color: #f9f9f9;
          overflow: hidden;
        }

        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
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

        .header h1 {
          margin: 0;
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
          // background-color: red;
          // border: 1px solid #ccc;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          z-index: 10;
          width: 100px;
          text-align: center;
          // display: ${dropdownVisible ? 'block' : 'none'};
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


        .navbar {
          display: flex;
          justify-content: space-around;
          background-color: #424242;
          color: white;
          padding: 8px;
          width: 100%;
          font-size: 14px;
          font-family: 'Open Sans', sans-serif;
        }

        .navbar span {
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .navbar span:hover {
          background-color: #616161;
        }

        .content {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          position: relative;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 40px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          margin-top: 20px;
          z-index: 2;
          position: relative;
        }

        .main-content h2 {
          margin-top: 0;
          font-size: 32px;
          color: #333;
          font-family: 'Open Sans', sans-serif;
          margin-bottom: 20px;
        }

        .form-container {
          margin-bottom: 20px;
          text-align: center;
        }

        label {
          font-weight: bold;
          font-size: 16px;
        }

        input[type="text"] {
          padding: 12px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: calc(100% - 24px);
          font-family: 'Open Sans', sans-serif;
          background-color: rgba(255, 255, 255, 0.8);
        }

        button {
          padding: 14px 20px;
          background-color: #D32F2F;
          color: white;
          border: none;
          border-radius: 5px;
          font-family: 'Open Sans', sans-serif;
          cursor: pointer;
          margin-top: 10px;
        }

        button:hover {
          background-color: #b71c1c;
        }

        .course-cards {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
          width: 100%;
        }

        .course-card {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          font-family: 'Open Sans', sans-serif;
          font-size: 16px;
          line-height: 1.5;
        }

        .course-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .error-message {
          color: red;
          font-size: 18px;
          margin-top: 10px;
        }

        .logo {
          margin-bottom: 20px;
          text-align: center;
        }

        .logo img {
          max-width: 300px;
          height: auto;
        }

        .background-image-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          opacity: 0.6;
        }

        .background-image {
          max-width: 800px;
          width: 100%;
          height: auto;

        .chatbot-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 1000;
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
            z-index: 1000;
        }
      `}</style>

      <div className="app">
        <header className="header">
          <h1>TerpEdu</h1>
          <h2>Instructor Dashboard</h2>
          <div className="profile-icon" onClick={handleProfileClick}>
            👤
            {dropdownVisible && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Navbar with navigation links */}
        <div className="navbar">
          <span onClick={() => handleNavigation('/inbox')}>Inbox</span>
          <span onClick={() => handleNavigation('/inst_announcements')}>Announcements</span>
          <span onClick={() => handleNavigation('/uploaded_materials')}>Uploaded materials</span>
          <span onClick={() => handleNavigation('/view_enrolled_students')}>View enrolled students</span>
        </div>

        {/* Main content with background image of Turtle */}
        <div className="logo">
          <img src="/TerpEdu.png" alt="TerpEdu Logo" />
        </div>
        <div className="content">
          <div className="background-image-container">
            <img src="/full_turtle.png" alt="Full Turtle" className="background-image" />
          </div>
          <div className="main-content">
            {/* Welcome message */}
            <h2>Welcome, {user_name}!</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="course-cards">
                {courses.length === 0 ? (
                  <p>No courses found.</p>
                ) : (
                  courses.map((course) => (
                    <div
                      key={course.course_ID}
                      className="course-card"
                      onClick={() => handleCourseClick(course)}
                    >
                      {/* Display course information */}
                      <div className="course-content">
                        <h4>{course.course_name}</h4>
                        <p><strong>Course ID:</strong> {course.course_id}</p>
                        <p><strong>Description:</strong> {course.course_description}</p>
                        <p><strong>Department:</strong> {course.course_department}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        <img src="/chatbot-icon2.gif" alt="Chatbot" style={{ width: '120px', height: '90px' }} />
      </button>


      {/* Chatbot */}
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

export default Dash;
