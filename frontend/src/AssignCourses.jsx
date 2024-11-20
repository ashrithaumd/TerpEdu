import React, { useEffect, useState } from 'react';

function AssignCourses() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState({});

  useEffect(() => {
    // Fetch active courses from backend and set initial instructor selection
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/course/get_active_courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          // Initialize instructor selections for each course
          const initialSelection = {};
          data.forEach((course) => {
            initialSelection[course.CourseID] = course.InstructorID || '';
          });
          setSelectedInstructors(initialSelection);
        } else {
          console.error('Error fetching courses:', response);
        }
      } catch (error) {
        console.error('An error occurred while fetching courses:', error);
      }
    };

    // Fetch available instructors from backend
    const fetchInstructors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/course/get_instructors');
        if (response.ok) {
          const data = await response.json();
          setInstructors(data);
        } else {
          console.error('Error fetching instructors:', response);
        }
      } catch (error) {
        console.error('An error occurred while fetching instructors:', error);
      }
    };

    // Fetch data for courses and instructors on component mount
    fetchCourses();
    fetchInstructors();
  }, []);

  // Handle changes in instructor selection for a given course
  const handleInstructorChange = (courseId, instructorId) => {
    setSelectedInstructors((prev) => ({
      ...prev,
      [courseId]: instructorId,
    }));
  };

  // Handle saving instructor assignments for selected courses
  const handleSave = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/course/assign_instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedInstructors)
      });

      if (response.ok) {
        alert('Courses updated successfully!');
      } else {
        console.error('Error saving instructor assignments:', response);
        alert('Failed to update courses. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while saving instructor assignments:', error);
      alert('Failed to update courses. Please try again.');
    }
  };

  return (
    <div className="assign-courses">
      {/* Inline styling for the page */}
      <style>
        {`
          .table-container {
            margin: 20px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 18px;
          }
          table th, table td {
            padding: 15px;
            border: 1px solid #dddddd;
            text-align: center;
          }
          table th {
            background-color: #f2a65a;
            color: #ffffff;
          }
          .save-button {
            margin: 20px;
            padding: 15px;
            background-color: #27ae60;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            width: 100%;
            background-color: #d32f2f;
            color: white;
            padding: 20px;
            font-size: 24px;
            text-align: center;
          }
        `}
      </style>

      <div className="header">Assign Courses</div>

      {/* Display a table of courses with dropdown to select instructors */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.CourseID}>
                <td>{course.CourseID}</td>
                <td>{course.CourseName}</td>
                <td>
                  <select
                    value={selectedInstructors[course.CourseID] || ''}
                    onChange={(e) => handleInstructorChange(course.CourseID, e.target.value)}
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((instructor) => (
                      <option key={instructor[0]} value={instructor[0]}>
                        {instructor[1]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button to save instructor assignments of courses */}
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default AssignCourses;
