import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function AnnouncementsAndAlerts() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/admin/get_announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data.announcements); // Access 'announcements' from the API response
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
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ textAlign: 'center', backgroundColor: '#e74c3c', color: 'white', padding: '30px', borderRadius: '10px' }}>
        Announcements & Alerts
      </h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading announcements...</p>
      ) : (
        announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <div key={index} style={{ margin: '30px 0', padding: '25px', backgroundColor: '#fff', borderRadius: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faMicrophone} size="3x" style={{ color: '#e74c3c', marginRight: '20px' }} />
                <h2>{`Course: ${announcement.CourseID} - ${announcement.CourseName}`}</h2>
              </div>
              <p>{announcement.Announcement}</p>
              <p style={{ textAlign: 'right' }}>Posted on: {announcement.DatePosted}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No announcements available</p>
        )
      )}
    </div>
  );
}

export default AnnouncementsAndAlerts;
