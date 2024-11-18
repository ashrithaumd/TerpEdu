import React, { useEffect, useState } from 'react';

function AssignCourses() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState({});

  useEffect(() => {
    // Fetch active courses
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/course/get_active_courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
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

    // Fetch instructors
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

    fetchCourses();
    fetchInstructors();
  }, []);

  const handleInstructorChange = (courseId, instructorId) => {
    setSelectedInstructors((prev) => ({
      ...prev,
      [courseId]: instructorId,
    }));
  };

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
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default AssignCourses;
