import React, { useEffect, useState } from 'react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from backend on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/course/get_all_courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Error fetching courses:', response);
        }
      } catch (error) {
        console.error('There was an error fetching the courses!', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8f9fa', fontSize: '18px' }}>
      {/* Header with logo and welcome message */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#c0392b', padding: '20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/path/to/logo.png" alt="TerpEdu Logo" style={{ height: '50px', marginRight: '20px' }} />
          <h1>Course Management</h1>
        </div>
        <h2>Hi {sessionStorage.getItem('user_name')}, Welcome back!</h2>
      </div>
      {/* Table displaying course information */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f39c12', color: 'white' }}>
              <th style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>Course Name</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>Instructor</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>Department</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>Number of Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  {/* Display course details */}
                  <td style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>{course.CourseName}</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
                    {course.Instructor ? (
                      course.Instructor
                    ) : (
                      <span style={{ color: 'red' }}>Instructor Yet To Be Assigned</span>
                    )}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>{course.Department}</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
                    {course.NumberOfStudents > 0 ? (
                      course.NumberOfStudents
                    ) : (
                      <span style={{ color: 'red' }}>Not Yet Open</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '16px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Button styling for adding or removing courses */}
      <div style={{ marginTop: '30px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#27ae60', color: 'white', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3>Add Course</h3>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3>Remove Course</h3>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
