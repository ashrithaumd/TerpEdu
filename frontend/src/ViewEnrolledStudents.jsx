import React, {useEffect, useState} from 'react';

function ViewEnrolledStudents() {
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [enrolledCount, setEnrolledCount] = useState(null);
  const [error, setError] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleFetchEnrolledStudents = async () => {
    if (!courseId) {
      setError('Please enter a valid Course ID');
      return;
    }

    try {
      const response = await fetch(`/course/get_enrolled/${courseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch enrolled students');
      }
      const data = await response.json();
      setEnrolledCount(data.enrolledCount);
      setError('');
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
      setError('Failed to fetch enrolled students. Please try again.');
      setEnrolledCount(null);
    }
  };

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      let url = role === 'Admin' ? `/course/get_all_courses` : `/inst/get_courses_by_inst/${userId}`;
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

  return (
    <div style={{ fontFamily: 'Open Sans, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <header style={{ backgroundColor: '#D32F2F', color: 'white', padding: '20px', fontSize: '22px', textAlign: 'left', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <h1 style={{ margin: 0, paddingLeft: '20px' }}>TerpEdu</h1>
      </header>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <img src="/TerpEdu.png" alt="TerpEdu Logo" style={{ maxWidth: '200px', height: 'auto', margin: '0 auto' }} />
      </div>
      <h2 style={{ fontSize: '28px', color: '#333', margin: '20px 0' }}>View Enrolled Students</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              width: '100%',
              maxWidth: '400px'
          }}>
              <label htmlFor="course_id">Course ID</label>
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
              <div style={{display: 'flex', justifyContent: 'center'}}>
                  <button
                      onClick={handleFetchEnrolledStudents}
                      style={{
                          padding: '10px 20px',
                          backgroundColor: '#D32F2F',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontFamily: 'Open Sans, sans-serif',
                          width: '100%',
                          maxWidth: '200px',
                          textAlign: 'center'
                      }}
                  >
                      Fetch Enrolled Students
                  </button>
              </div>
          </div>
      </div>
        {error && <p style={{color: 'red', fontSize: '16px'}}>{error}</p>}
        {enrolledCount !== null && (
            <p style={{fontSize: '18px', color: '#333'}}>
                Number of students enrolled in Course ID {courseId}: {enrolledCount}
            </p>
        )}
        <div style={{position: 'fixed', right: 0, top: '70px', bottom: 0, zIndex: -1, opacity: 0.7}}>
            <img src="/turtle.png" alt="Turtle" style={{height: '100%', objectFit: 'cover'}}/>
        </div>
    </div>
  );
}

export default ViewEnrolledStudents;
