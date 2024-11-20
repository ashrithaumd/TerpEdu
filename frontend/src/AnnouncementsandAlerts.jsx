import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function AnnouncementsAndAlerts() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/admin/get_announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data.announcements);
        } else {
          console.error('Failed to fetch announcements.');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '40px',
          borderRadius: '10px',
          fontSize: '36px',
        }}
      >
        Announcements & Alerts
      </h1>
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Loading announcements...
        </p>
      ) : announcements.length > 0 ? (
        announcements.map((announcement, index) => (
          <div
            key={index}
            style={{
              margin: '40px 0',
              padding: '30px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                size="3x"
                style={{
                  color: '#e74c3c',
                  marginRight: '20px',
                }}
              />
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Course: {announcement.CourseID} - {announcement.CourseName}
              </h2>
            </div>
            <p
              style={{
                fontSize: '18px',
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              {announcement.Announcement}
            </p>
            <p
              style={{
                textAlign: 'right',
                fontSize: '16px',
                color: '#888',
                fontStyle: 'italic',
              }}
            >
              Posted on: {announcement.DatePosted}
            </p>
          </div>
        ))
      ) : (
        <p
          style={{
            textAlign: 'center',
            fontSize: '20px',
            marginTop: '20px',
            color: '#888',
          }}
        >
          No announcements available
        </p>
      )}
    </div>
  );
}

export default AnnouncementsAndAlerts;
