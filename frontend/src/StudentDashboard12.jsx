import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function StudentDashboard() {
  const { userID } = useParams(); // Extract userID from URL
  const [studentName, setStudentName] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showDropDropdown, setShowDropDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(userID);

  // Fetch data for the dashboard
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/student/dashboard/${userID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debug log
      setStudentName(data.name || "Student");
      setEnrolledCourses(data.enrolled_courses || []);
      setAvailableCourses(data.available_courses || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("UserID:", userID); // Debug log
    fetchData();
  }, [userID]);

  // Handle adding a course
  const handleAddCourse = async (courseId) => {
    if (!courseId) return;
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:5000/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: courseId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add course");
      }
      alert("Course added successfully!");
      setShowAddDropdown(false); // Close the dropdown
      fetchData(); // Refresh data after adding a course
    } catch (error) {
      console.error("Error adding course:", error);
      setError(`Error: ${error.message}`);
    }
  };

  // Handle dropping a course
  const handleDropCourse = async (courseId) => {
    if (!courseId) return;
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:5000/student/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: courseId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to drop course");
      }
      alert("Course dropped successfully!");
      setShowDropDropdown(false); // Close the dropdown
      fetchData(); // Refresh data after dropping a course
    } catch (error) {
      console.error("Error dropping course:", error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
        }
        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .header {
          background-color: #D32F2F;
          color: white;
          padding: 10px;
          text-align: center;
        }
        .main-content {
          padding: 20px;
          text-align: center;
        }
        .button {
          background-color: #D32F2F;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 10px;
        }
        .button:hover {
          background-color: #b71c1c;
        }
        .dropdown {
          margin-top: 10px;
        }
        .course-card {
          background-color: #ffcccc;
          padding: 15px;
          border-radius: 5px;
          margin: 10px;
          text-align: center;
          font-weight: bold;
        }
        select {
          padding: 10px;
          margin-top: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }
      `}</style>
      <div className="app">
        <header className="header">
          <h1>Student Dashboard</h1>
          <p>Welcome back, {studentName}!</p>
        </header>
        <div className="main-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <>
              <h2>Your Courses</h2>
              <div>
                {enrolledCourses.length === 0 ? (
                  <p>You are not enrolled in any courses.</p>
                ) : (
                  enrolledCourses.map((course) => (
                    <div key={course.course_id} className="course-card">
                      {course.course_name}
                    </div>
                  ))
                )}
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => {
                    setShowAddDropdown(!showAddDropdown);
                    setShowDropDropdown(false); // Close drop dropdown
                  }}
                >
                  Add Course
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setShowDropDropdown(!showDropDropdown);
                    setShowAddDropdown(false); // Close add dropdown
                  }}
                >
                  Drop Course
                </button>
              </div>
              {showAddDropdown && (
                <div className="dropdown">
                  <select
                    onChange={(e) => handleAddCourse(e.target.value)}
                    disabled={availableCourses.length === 0}
                  >
                    <option value="">
                      {availableCourses.length === 0
                        ? "No courses available to add"
                        : "Select a course to add"}
                    </option>
                    {availableCourses.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {showDropDropdown && (
                <div className="dropdown">
                  <select onChange={(e) => handleDropCourse(e.target.value)}>
                    <option value="">
                      {enrolledCourses.length === 0
                        ? "No courses available to drop"
                        : "Select a course to drop"}
                    </option>
                    {enrolledCourses.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
