import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dash() {
  const navigate = useNavigate();
  const [instructorId, setInstructorId] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchCourses = async () => {
    if (!instructorId) {
      setError('Please enter a valid instructor ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/inst/get_courses_by_inst/${instructorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to handle clicking on a course card
  const handleCourseClick = (course) => {
    const { course_ID, name, description, department } = course;
    // Ensure to encode URI components to avoid issues with special characters
    navigate(`/get_course/${course_ID}/${encodeURIComponent(name)}/${encodeURIComponent(description)}/${encodeURIComponent(department)}/${instructorId}`);
  };

  return (
    <div>
      <style>{`
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        font-size:10px;
        overflow:hidden;
      }

      .app {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }

      /* Header */
      .header {
        background-color: #D32F2F;
        color: white;
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .profile-icon {
        font-size: 24px;
        position: absolute;
        right: 20px;
      }

      /* Navbar */
      .navbar {
        display: flex;
        justify-content: space-around;
        background-color: #424242;
        color: white;
        padding: 10px;
        width: 100%;
      }

      .navbar span {
        cursor: pointer;
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .navbar span:hover {
        background-color: #616161;
      }

      /* Content Layout */
      .content {
        display: flex;
        flex: 1;
        padding: 20px;
      }

      /* Main Content */
      .main-content {
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .main-content h2 {
        margin-top: 0;
        color: #333;
      }

      /* Form Styles */
      .form-container {
        margin-bottom: 20px;
        text-align: center;
      }

      label {
        font-weight: bold;
      }

      input[type="text"] {
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 200px;
      }

      button {
        padding: 10px 15px;
        background-color: #D32F2F;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
      }

      button:hover {
        background-color: #b71c1c;
      }

      /* Course Cards */
      .course-cards {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
      }

      .course-card {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        width: 100%;
      }

      .course-card:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .course-content h4 {
        margin: 0 0 5px;
        color: #D32F2F;
      }

      .course-content p {
        margin: 2px 0;
        color: #555;
      }

      /* Sidebar */
      .sidebar {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 20px;
        position: relative;
      }

      .sidebar img {
        max-width: 100%;
        height: 500px;
        left:50px;
      }

      `}</style>
      <div className="app">
        <header className="header">
          <h1>TerpEdu</h1>
          <div className="profile-icon">👤</div>
        </header>
        <div className="navbar">
          <span onClick={() => handleNavigation('/inbox')}>Inbox</span>
          <span onClick={() => handleNavigation('/announcements')}>Announcements</span>
          <span onClick={() => handleNavigation('/uploaded_materials')}>Uploaded materials</span>
          <span onClick={() => handleNavigation('/calendar')}>Calendar</span>
        </div>
        <div className="content">
          <div className="main-content">
            <h2>Welcome, Medini!</h2>
            <div className="form-container">
              <label htmlFor="instructorId">Enter Instructor ID:</label>
              <input
                type="text"
                id="instructorId"
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
              />
              <button onClick={handleFetchCourses}>Fetch Courses</button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
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
                      <div className="course-content">
                        <h4>{course.name}</h4>
                        <p><strong>Course ID:</strong> {course.course_ID}</p>
                        <p><strong>Description:</strong> {course.description}</p>
                        <p><strong>Department:</strong> {course.department}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="sidebar">
            <img src="https://media.istockphoto.com/id/1700535742/vector/turtle-icon.jpg?s=2048x2048&w=is&k=20&c=ZdczUpIyBaX2ymL9bs_i_SKQZUaEcogf4XdNPhB0Dbw=" alt="Turtle Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
