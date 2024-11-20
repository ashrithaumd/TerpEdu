import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function GetCourse() {
  // Extract parameters from the URL for course details
  const { courseId, name, description, department, instructorId } = useParams();

  // State for course details and file upload form
  const [course, setCourse] = useState({
    course_ID: courseId,
    name: decodeURIComponent(name), // Decodes URL-encoded name
    description: decodeURIComponent(description),
    department: decodeURIComponent(department),
    instructor_ID: instructorId
  });

  // State for controlling upload form visibility and handling file inputs
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [materialName, setMaterialName] = useState('');
  const [materialFile, setMaterialFile] = useState(null);

  // Toggle visibility of the file upload form
  const handleUploadMaterial = () => {
    setShowUploadForm(!showUploadForm);
  };

  // Update file input state on change
  const handleFileChange = (e) => {
    setMaterialFile(e.target.files[0]);
  };

  // Update material name state on change
  const handleNameChange = (e) => {
    setMaterialName(e.target.value);
  };

  // Handle form submission to upload course materials
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Create form data to send file and metadata to the server
    const formData = new FormData();
    formData.append('materialName', materialName);
    formData.append('materialFile', materialFile);

    try {
      // POST request to upload the course material
      const response = await fetch(`http://localhost:5000/course/course_material/${course.course_ID}/${course.instructor_ID}`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Ensures cookies are sent if needed
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        // Reset form inputs after successful upload
        setMaterialName('');
        setMaterialFile(null);
        setShowUploadForm(false);
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file. Please try again.');
    }
  };

  return (
    <div>
      {/* Inline CSS styling */}
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

      body {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        background-color: #f9f9f9;
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

      .content-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex: 1;
        padding: 20px;
        position: relative;
      }

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

      .upload-button {
        padding: 10px 15px;
        background-color: #D32F2F;
        color: white;
        border: none;
        border-radius: 5px;
        font-family: 'Open Sans', sans-serif;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
        max-width: 200px;
      }

      .upload-button:hover {
        background-color: #b71c1c;
      }

      .course-details {
        text-align: left;
        margin-bottom: 10px;
        font-size: 16px;
        width: 100%;
      }

      .form-container {
        text-align: left;
        width: 100%;
        font-size: 16px;
        margin-top: 10px;
        max-height: 300px;
        overflow-y: auto;
        padding-right: 10px;
      }

      .form-container button {
        padding: 10px 15px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
        max-width: 200px;
        margin-left: auto;
        margin-right: auto;
        display: block;
      }

      .form-container label {
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
      }

      .form-container input[type="text"],
      .form-container input[type="file"] {
        padding: 8px;
        margin: 5px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 100%;
        box-sizing: border-box;
      }

      .sidebar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0;
        margin: 0;
        position: absolute;
        right: 0;
        top: 70px;
      }

      .sidebar img {
        width: 200px;
        height: auto;
        margin-right: 0;
      }

      .logo {
        margin-bottom: 20px;
        text-align: center;
      }

      .logo img {
        max-width: 200px;
        height: auto;
      }
      `}</style>

      {/* Main application layout */}
      <div className="app">
        {/* Header with site title */}
        <header className="header">
          <h1>TerpEdu</h1>
        </header>
        <div className="content-container">
          <div className="main-content">
            {/* Display course details */}
            <div className="logo">
              <img src="/TerpEdu.png" alt="TerpEdu Logo" />
            </div>
            <h2>Upload Course Materials</h2>
            <div className="course-details">
              <h4>{course.name}</h4>
              <p><strong>Course ID:</strong> {course.course_ID}</p>
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Department:</strong> {course.department}</p>
            </div>

            {/* Upload form toggle button */}
            <button className="upload-button" onClick={handleUploadMaterial}>
              {showUploadForm ? 'Cancel Upload' : 'Upload Material'}
            </button>

            {/* File upload form */}
            {showUploadForm && (
              <div className="form-container">
                <h3>Upload Material</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '10px' }}>
                    <label>
                      Material Name:
                      <input
                        type="text"
                        value={materialName}
                        onChange={handleNameChange}
                        required
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label>
                      Upload File:
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                      />
                    </label>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </div>
          {/* Sidebar with turtle image */}
          <div className="sidebar">
            <img src="/turtle.png" alt="Turtle Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetCourse;
