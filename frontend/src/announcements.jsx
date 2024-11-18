import React, { useState } from 'react';

function PostAnnouncement() {
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState(''); // New state for user ID
  const [announcement, setAnnouncement] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to send to the server
    const formData = { course_id: courseId, user_id: userId, announcement };

    try {
      const response = await fetch('http://localhost:5000/inst/announce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Announcement posted successfully!');
        // Reset form fields
        setCourseId('');
        setUserId(''); // Clear user ID field
        setAnnouncement('');
      } else {
        const errorData = await response.json();
        alert(`Error posting announcement: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error posting announcement:', error);
      alert('An error occurred while posting the announcement.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Post an Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="course_id" style={{ display: 'block', marginBottom: '5px' }}>
            Course ID
          </label>
          <input
            type="text"
            id="course_id"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="user_id" style={{ display: 'block', marginBottom: '5px' }}>
            User ID
          </label>
          <input
            type="text"
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="announcement" style={{ display: 'block', marginBottom: '5px' }}>
            Announcement
          </label>
          <textarea
            id="announcement"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            required
            rows="4"
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
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
  );
}

export default PostAnnouncement;
