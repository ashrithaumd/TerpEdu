import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function AnnouncementsAndAlerts() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch announcements from backend using fetch
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/admin/get_announcements');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Announcements:', data); // Debugging statement
          setAnnouncements(data);
        } else {
          console.error('Error fetching announcements:', response);
        }
      } catch (error) {
        console.error('An error occurred while fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ textAlign: 'center', backgroundColor: '#e74c3c', color: 'white', padding: '30px', borderRadius: '10px', fontSize: '36px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)' }}>
        Announcements & Alerts
      </h1>
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '24px', color: '#555' }}>Loading announcements...</p>
      ) : (
        announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <div key={index} style={{
              margin: '30px 0',
              padding: '25px',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              borderLeft: '8px solid #e67e22'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <FontAwesomeIcon icon={faMicrophone} size="3x" style={{ color: '#e74c3c', marginRight: '20px' }} />
                <h2 style={{ margin: 0, fontSize: '28px', color: '#2c3e50' }}>{`Course: ${announcement.CourseID} - ${announcement.CourseName}`}</h2>
              </div>
              <p style={{ fontSize: '22px', marginTop: '15px', color: '#34495e', lineHeight: '1.6', fontWeight: 'bold' }}>
                {announcement.Announcement}
              </p>
              <p style={{ fontSize: '16px', color: '#7f8c8d', textAlign: 'right', marginTop: '20px' }}>
                Posted on: {announcement.DatePosted}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '24px', color: '#999' }}>No announcements available</p>
        )
      )}
    </div>
  );
}

export default AnnouncementsAndAlerts;