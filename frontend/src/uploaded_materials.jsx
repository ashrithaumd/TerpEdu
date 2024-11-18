import React, { useEffect, useState } from 'react';

function UploadedMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded materials from the server
    const fetchMaterials = async () => {
      try {
        // Fetch user ID from the server session or include it in the request headers if needed
        const response = await fetch('http://localhost:5000/course/get_uploaded_materials', {
          method: 'GET',
          credentials: 'include' // This ensures cookies (including session cookies) are sent with the request
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

    fetchMaterials();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Uploaded Materials</h2>
      {materials.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {materials.map((material) => (
            <li key={material.id} style={{ marginBottom: '15px' }}>
              <strong>{material.title}</strong> -{' '}
              <a
                href={`../frontend/public/${material.file_path}`}
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
  );
}

export default UploadedMaterials;
