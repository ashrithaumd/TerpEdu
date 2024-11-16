import React, { useEffect, useState } from 'react';

function Inbox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/get_notifications'); // Adjust the URL if necessary
        // console.log(response); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); 
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <div>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.UserID}>
                <p><strong>Message:</strong> {notification.Message}</p>
                <p><strong>Created At: {notification.DateSent}</strong></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Inbox;
