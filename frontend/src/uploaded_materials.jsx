import React, { useState } from 'react';

function UploadedMaterials() {
  const [materials, setMaterials] = useState([]);
  const [userId, setUserId] = useState('');
  const [submittedUserId, setSubmittedUserId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedUserId(userId); // Store the userId entered by the user

    // Fetch the list of uploaded materials from the server
    try {
      const response = await fetch(`/course/get_uploaded_materials/${userId}`, {
        method: 'GET',
        credentials: 'include' // Ensure cookies are sent with the request if needed
      });

      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      } else {
        console.error('Failed to fetch materials');
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Uploaded Materials</h2>

      {/* Form to input userId */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">Enter User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Fetch Materials</button>
      </form>

      {submittedUserId && (
        <div>
          <h3>Materials for User ID: {submittedUserId}</h3>
          {materials.length === 0 ? (
            <p>No materials available.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {materials.map((material) => (
                <li key={material.id} style={{ marginBottom: '15px' }}>
                  <strong>{material.title}</strong> -{' '}
                  <a
                    href={`./public/${material.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#007BFF',
                      textDecoration: 'none'
                    }}
                  >
                    View File
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadedMaterials;
