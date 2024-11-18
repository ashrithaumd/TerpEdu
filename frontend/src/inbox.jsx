import React, { useEffect, useState } from 'react';

function Inbox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/get_notifications'); // Adjust the URL if necessary
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
    <div style={styles.container}>
      <h2 style={styles.header}>Inbox</h2>
      <div style={styles.notificationsContainer}>
        {notifications.length === 0 ? (
          <p style={styles.noNotifications}>No notifications available.</p>
        ) : (
          <ul style={styles.notificationList}>
            {notifications.map((notification) => (
              <li key={notification.UserID} style={styles.notificationItem}>
                <p style={styles.message}><strong>Message:</strong> {notification.Message}</p>
                <p style={styles.date}><strong>Created At:</strong> {notification.DateSent}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#D32F2F',
  },
  notificationsContainer: {
    marginTop: '20px',
  },
  noNotifications: {
    textAlign: 'center',
    color: '#555',
    fontStyle: 'italic',
  },
  notificationList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  notificationItem: {
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  notificationItemHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  message: {
    margin: '0 0 5px',
    color: '#333',
  },
  date: {
    margin: 0,
    color: '#777',
    fontSize: '0.9em',
  },
};

export default Inbox;
