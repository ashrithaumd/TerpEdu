import React, { useState } from 'react';

function PostAnnouncement() {
  // State hooks for managing form input values
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [announcement, setAnnouncement] = useState('');

  // Handles the form submission event
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Create an object to hold form data for the POST request
    const formData = { course_id: courseId, user_id: userId, announcement };

    try {
      // Send a POST request to the server with form data
      const response = await fetch('http://localhost:5000/inst/announce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Convert the form data object to a JSON string
      });

      // Check if the request was successful
      if (response.ok) {
        alert('Announcement posted successfully!');
        // Reset form input values after successful submission
        setCourseId('');
        setUserId('');
        setAnnouncement('');
      } else {
        // Handle error responses from the server
        const errorData = await response.json();
        alert(`Error posting announcement: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error posting announcement:', error);
      alert('An error occurred while posting the announcement.');
    }
  };

  return (
    <div>
      <style>{`
        /* Importing font */
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

        body {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          background-color: #f9f9f9;
        }

        /* Main container styling for consistent layout */
        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        /* Header styling */
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
        }

        .header h1 {
          margin: 0;
        }

        /* Content container styling for form positioning */
        .content-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex: 1;
          padding: 20px;
          position: relative;
        }

        /* Main content box styling */
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
          margin-top: 20px;
          font-family: 'Open Sans', sans-serif;
        }

        .main-content h2 {
          margin-top: 0;
          font-size: 24px;
          color: #333;
        }

        /* Form container styling */
        .form-container {
          width: 100%;
        }

        /* Form labels styling */
        .form-container label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }

        /* Styling for input fields and textareas */
        .form-container input[type="text"],
        .form-container textarea {
          padding: 10px;
          margin: 5px 0;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 100%;
          box-sizing: border-box;
        }

        /* Submit button styling */
        .form-container button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        .form-container button:hover {
          background-color: #45a049;
        }

        /* Sidebar styling for image */
        .sidebar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0;
          margin: 0;
          position: absolute;
          right: 0;
          top: 70px;
          opacity: 0.7;
        }

        .sidebar img {
          width: 200px;
          height: auto;
          margin-right: 0;
        }
      `}</style>
      <div className="app">
        <header className="header">
          <h1>TerpEdu</h1>
        </header>
        <div className="content-container">
          <div className="main-content">
            <h2>Post an Announcement</h2>
            {/* Form for posting an announcement */}
            <form onSubmit={handleSubmit} className="form-container">
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="course_id">Course ID</label>
                <input
                  type="text"
                  id="course_id"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="user_id">User ID</label>
                <input
                  type="text"
                  id="user_id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="announcement">Announcement</label>
                <textarea
                  id="announcement"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  required
                  rows="4"
                ></textarea>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="sidebar">
            <img src="/turtle.png" alt="Turtle Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAnnouncement;
