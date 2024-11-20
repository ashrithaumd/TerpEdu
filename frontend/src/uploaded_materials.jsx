import React, { useState } from 'react';

function UploadedMaterials() {
  const [materials, setMaterials] = useState([]);
  const [userId, setUserId] = useState('');
  const [submittedUserId, setSubmittedUserId] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedUserId(userId);

    try {
      const response = await fetch(`/course/get_uploaded_materials/${userId}`, {
        method: 'GET',
        credentials: 'include'
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

  const handleViewFile = (filePath) => {
    let normalizedPath = filePath.replace(/\\/g, '/');
    if (!normalizedPath.startsWith('/materials/')) {
      normalizedPath = `/materials/${normalizedPath.replace(/^.*\/materials\//, '')}`;
    }
    setSelectedFile(normalizedPath);
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

        body {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          background-color: #f9f9f9;
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
        }

        .main-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px;
          min-height: calc(100vh - 70px);
          position: relative;
          overflow-y: auto;
        }

        .content-box {
          width: 100%;
          max-width: 700px;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .title {
          font-size: 32px;
          font-family: 'Open Sans', sans-serif;
          margin-bottom: 20px;
          color: #333;
        }

        .subtitle {
          font-size: 20px;
          margin-bottom: 25px;
          color: #666;
        }

        .form-container {
          margin-bottom: 20px;
        }

        .input-field {
          padding: 14px;
          margin: 12px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: calc(100% - 28px);
          font-size: 16px;
        }

        .button {
          padding: 14px 24px;
          background-color: #D32F2F;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 12px;
          font-size: 16px;
        }

        .button:hover {
          background-color: #b71c1c;
        }

        .materials-list {
          text-align: left;
          margin-top: 25px;
        }

        .materials-container {
          border: 1px solid #ddd;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }

        .materials-heading {
          font-size: 24px;
          color: #444;
          margin-bottom: 15px;
        }

        .material-item {
          padding: 14px;
          margin-bottom: 14px;
          background-color: #f1f1f1;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
        }

        .view-button {
          padding: 10px 14px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .view-button:hover {
          background-color: #0056b3;
        }

        .file-viewer {
          margin-top: 25px;
          border: 1px solid #ccc;
        }

        .turtle-container {
          position: fixed;
          top: 70px;
          right: 0;
          bottom: 0;
          opacity: 0.7;
        }

        .turtle-image {
          height: 100%;
          width: auto;
        }
      `}</style>

      <header className="header">
        <h1>TerpEdu</h1>
      </header>

      <div className="main-container">
        <div className="content-box">
          <h2 className="title">Uploaded Materials</h2>
          <p className="subtitle">View the uploaded material for User ID:</p>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                className="input-field"
                required
              />
              <button type="submit" className="button">Fetch Materials</button>
            </form>
          </div>

          {submittedUserId && (
            <div className="materials-container">
              <h3 className="materials-heading">Materials for User ID: {submittedUserId}</h3>
              {materials.length === 0 ? (
                <p>No materials available.</p>
              ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {materials.map((material) => (
                    <li key={material.id} className="material-item">
                      <span>{material.title}</span>
                      <button
                        onClick={() => handleViewFile(material.file_path)}
                        className="view-button"
                      >
                        View File
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {selectedFile && (
            <div className="file-viewer">
              <h3>Viewing File</h3>
              <p>{selectedFile}</p>
              <iframe
                src={selectedFile}
                title="File Viewer"
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc' }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="turtle-container">
        <img src="/turtle.png" alt="Turtle" className="turtle-image" />
      </div>
    </div>
  );
}

export default UploadedMaterials;
