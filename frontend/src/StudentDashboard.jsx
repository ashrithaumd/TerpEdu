import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import "./chatbot/chatbot.css"; // Import chatbot styling
import { loadInitialSuggestions, sendMessage } from './chatbot/chatbot.js';

function StudentDashboard() {
  const { user_name } = useParams();
  const navigate = useNavigate(); // React Router hook for navigation
  const [userID, setUserID] = useState(localStorage.getItem("user_id"));
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showChatbot, setShowChatbot] = useState(false); // Chatbot visibility state

  // Navigate to a new path
  const handleNavigation = (path) => {
    navigate(path);
  }

  const toggleChatbot = () => {
    console.log("Chatbot visibility toggled:", !showChatbot);
    setShowChatbot(!showChatbot);
  };

  const fetchDashboardData = async () => {
    setLoading(true); // Start loading when fetching data
    setError(""); // Reset error state before fetching
    try {
      const response = await fetch(`/student/dashboard/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      console.log("Dashboard data:", data);
      setEnrolledCourses(data.enrolled_courses || []);
      setAvailableCourses(data.available_courses || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false); // Stop loading after data is fetched or error occurred
    }
  };

  const handleAddCourse = async () => {
    if (!selectedCourse) {
      alert("Please select a course to add!");
      return;
    }
    try {
      const response = await fetch("/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.status === "success") {
        alert(data.message || "Course added successfully!");
        fetchDashboardData();
        setSelectedCourse("");
      } else {
        throw new Error(data.error || "Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert(error.message || "Failed to add course. Please try again.");
    }
  };
  

  const handleDropCourse = async () => {
    if (!selectedCourse) {
      alert("Please select a course to drop!");
      return;
    }
    try {
      const response = await fetch("/student/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to drop course");
      }
      alert("Course dropped successfully!");
      fetchDashboardData();
      setSelectedCourse("");
    } catch (error) {
      console.error("Error dropping course:", error);
      alert("Failed to drop course. Please try again.");
    }
  };

  const renderCourses = (courses) => {
    return courses.map((course) => (
      <li key={course.course_id}>
        {course.course_name} (Course ID: {course.course_id})
      </li>
    ));
  };

  useEffect(() => {
    fetchDashboardData();
    // Dynamically load CSS for the chatbot
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/chatbot.css";
    document.head.appendChild(link);

    // Dynamically load JS for the chatbot
    const script = document.createElement("script");
    script.src = "/chatbot.js";
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
    <div style={{ padding: "20px" }}>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            background-color: #f9f9f9;
          }

          .header {
            width: 100%;
            background-color: #D32F2F;
            color: white;
            padding: 15px 20px;
            font-size: 28px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
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


          .logo-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }

          .logo-container img {
            max-width: 300px;
            height: auto;
          }

          .turtle-image {
            position: absolute;
            right: 0;
            bottom: 0;
            max-height: calc(100vh - 80px);
            max-width: 350px;
            opacity: 0.5;
          }

          .dashboard-container {
            max-width: 800px;
            margin: 40px auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }

          .form-container {
            margin: 20px 0;
            text-align: center;
          }

          .courses-section h3 {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .courses-section ul {
            padding-left: 20px;
            font-size: 18px;
          }

          .action-buttons {
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }

          button {
            padding: 12px 20px;
            margin: 0 10px;
            background-color: #D32F2F;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #b71c1c;
          }

          select {
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            margin-right: 10px;
          }

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
        `}
      </style>

      <header className="header">
        <span>TerpEdu</span>
        <span>Student Dashboard</span>
        <span>Welcome, {user_name}</span>
      </header>
      <div className="navbar">
          <span onClick={() => handleNavigation('/inbox')}>Inbox</span>
          <span onClick={() => handleNavigation('/inst_announcements')}>Announcements</span>
          <span onClick={() => handleNavigation('/uploaded_materials')}>Uploaded materials</span>
          {/* <span onClick={() => handleNavigation('/view_enrolled_students')}>View enrolled students</span> */}
        </div>

      <div className="logo-container">
        <img src="/TerpEdu.png" alt="TerpEdu Logo" />
      </div>

      {loading ? (
        <p>Loading...</p> // Display loading text while data is being fetched
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p> // Display error message if any error occurs
      ) : (
        <div className="dashboard-container">
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Student Dashboard
          </h2>
          <div className="courses-section">
            <h3>Enrolled Courses</h3>
            <ul>{renderCourses(enrolledCourses)}</ul>
          </div>
          <div className="courses-section">
            <h3>Available Courses</h3>
            <ul>{renderCourses(availableCourses)}</ul>
          </div>
          <div className="action-buttons">
            <select
              onChange={(e) => setSelectedCourse(e.target.value)}
              value={selectedCourse}
            >
              <option value="">Select a course to add</option>
              {availableCourses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
            <button onClick={handleAddCourse}>Add Course</button>

            <select
              onChange={(e) => setSelectedCourse(e.target.value)}
              value={selectedCourse}
            >
              <option value="">Select a course to drop</option>
              {enrolledCourses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
            <button onClick={handleDropCourse}>Drop Course</button>
          </div>
        </div>
      )}

      <img src="/turtle.png" alt="Turtle" className="turtle-image" />

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

export default StudentDashboard;
