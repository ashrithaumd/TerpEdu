import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function GetCourse() {
  // Extract parameters, including instructorId
  const { courseId, name, description, department, instructorId } = useParams();
 
  const [course, setCourse] = useState({
    course_ID: courseId,
    name: decodeURIComponent(name),
    description: decodeURIComponent(description),
    department: decodeURIComponent(department),
    instructor_ID: instructorId // Store instructorId if needed for future use
  });

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [materialName, setMaterialName] = useState('');
  const [materialFile, setMaterialFile] = useState(null);

  const handleUploadMaterial = () => {
    setShowUploadForm(!showUploadForm);
  };

  const handleFileChange = (e) => {
    setMaterialFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setMaterialName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('materialName', materialName);
    formData.append('materialFile', materialFile);

    try {
      const response = await fetch(`http://localhost:5000/course/course_material/${course.course_ID}/${course.instructor_ID}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        // Optionally clear the form after success
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{course.name}</h1>
      <p><strong>Course ID:</strong> {course.course_ID}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Department:</strong> {course.department}</p>
     
      <button
        onClick={handleUploadMaterial}
        style={{
          marginTop: '20px',
          padding: '10px 15px',
          backgroundColor: '#D32F2F',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {showUploadForm ? 'Cancel Upload' : 'Upload Material'}
      </button>

      {showUploadForm && (
        <div style={{ marginTop: '20px' }}>
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
                  style={{
                    padding: '8px',
                    margin: '5px 0',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '100%'
                  }}
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
                  style={{
                    padding: '8px',
                    margin: '5px 0',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 15px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default GetCourse;
