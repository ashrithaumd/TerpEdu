import React, { useState } from 'react';

function Inbox() {
  const [notifications, setNotifications] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchNotifications = async () => {
    if (!courseId) {
      setError('Please enter a valid Course ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://127.0.0.1:5000/user/get_notifications/${courseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications.');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to fetch notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

        body {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          background-color: #f9f9f9;
          overflow: hidden;
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
          align-items: center;
          height: calc(100vh - 70px);
          padding: 20px;
          position: relative;
        }

        .inbox-box {
          width: 100%;
          max-width: 600px;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin: auto;
        }

        .inbox-title {
          font-size: 28px;
          font-family: 'Open Sans', sans-serif;
          margin-bottom: 20px;
          color: #333;
        }

        .form-container {
          margin-bottom: 20px;
        }

        .input-label {
          font-size: 18px;
          margin-bottom: 10px;
          display: block;
        }

        .input-field {
          padding: 12px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: calc(100% - 24px);
        }

        .button {
          padding: 12px 20px;
          background-color: #D32F2F;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }

        .button:hover {
          background-color: #b71c1c;
        }

        .notifications-container {
          margin-top: 20px;
          text-align: left;
        }

        .notification {
          padding: 15px;
          margin-bottom: 15px;
          background-color: #f4f4f4;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 16px;
        }

        .notification p {
          margin: 5px 0;
        }

        .error-message {
          color: red;
          font-size: 16px;
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
        <div className="inbox-box">
          <h2 className="inbox-title">Class Discussion</h2>
          <div className="form-container">
            <label htmlFor="courseId" className="input-label">
              Enter the Course ID to see the Class Discussion
            </label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="input-field"
            />
            <button onClick={handleFetchNotifications} className="button">Fetch Notifications</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="notifications-container">
              {notifications.length === 0 ? (
                <p>No notifications available.</p>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.NotificationID} className="notification">
                   <p><strong>Announcement:</strong> {notification.Message}</p>
                   <p><strong>Created At:</strong> {notification.DateSent}</p>
                  <p><strong>Created By:</strong> {notification.CreatorRole} (UserID: {notification.UserID})</p>
                  </div>
                ))
              )}
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

export default Inbox;

