import React, { useState } from 'react';

function ViewInstCourses() {
    const [instructorId, setInstructorId] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchCourses = async () => {
        if (!instructorId) {
            setError('Please enter a valid instructor ID');
            return;
        }
        
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/inst/get_courses_by_inst/${instructorId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to fetch courses. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>View Instructor Courses</h1>
            <div>
                <label htmlFor="instructorId">Enter Instructor ID:</label>
                <input
                    type="text"
                    id="instructorId"
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                />
                <button onClick={handleFetchCourses}>Fetch Courses</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    {courses.length === 0 ? (
                        <p>No courses found.</p>
                    ) : (
                        <ul>
                            {courses.map((course) => (
                                <li key={course.course_ID}>
                                    <p><strong>Course ID:</strong> {course.course_ID}</p>
                                    <p><strong>Name:</strong> {course.name}</p>
                                    <p><strong>Description:</strong> {course.description}</p>
                                    <p><strong>Department:</strong> {course.department}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default ViewInstCourses;
