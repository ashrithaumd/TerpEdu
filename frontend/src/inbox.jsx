import React, {useEffect, useState} from 'react';

function Inbox() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      let url = role === 'Student' ? `/student/get_enrolled_courses?user_id=${userId}` : `/inst/get_courses_by_inst/${userId}`;
      if (role === 'Admin') {
        url = `/course/get_all_courses`;
      }
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setEnrolledCourses(data);
        } else {
          console.error('Failed to fetch enrolled courses.');
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [userId]);


  const handleFetchNotifications = async () => {
    if (!courseId) {
      setError('Please enter a valid Course ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/user/get_notifications/${courseId}`);
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
              Select the Course ID to see the Class Discussion
            </label>
            <select
                id="course_id"
                className="form-input"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
            >
              <option value="" disabled>Select a course</option>
              {enrolledCourses.map(course => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_id} - {course.course_name}
                  </option>
              ))}
            </select>
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

