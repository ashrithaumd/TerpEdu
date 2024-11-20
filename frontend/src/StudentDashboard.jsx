import React, { useState } from "react";

function StudentDashboard() {
  const [userID, setUserID] = useState(""); // State to store user input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Enrolled courses
  const [availableCourses, setAvailableCourses] = useState([]); // Available courses
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [showAddDropdown, setShowAddDropdown] = useState(false); // Show Add dropdown
  const [showDropDropdown, setShowDropDropdown] = useState(false); // Show Drop dropdown
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course for add/drop

  // Fetch data for the dashboard
  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://127.0.0.1:5000/student/dashboard/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      console.log("Dashboard data:", data); // Debugging output
      setEnrolledCourses(
        (data.enrolled_courses || []).map((course) => ({
          course_id: course[0],
          course_name: course[1],
          description: course[2],
          credits: course[3],
          department: course[4],
          semester: course[5],
          is_currently_active: course[6],
        }))
      );
      setAvailableCourses(data.available_courses || []);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogin = (e) => {
    e.preventDefault();
    if (userID.trim() === "") {
      alert("Please enter a valid UserID");
      return;
    }
    fetchDashboardData();
  };

  const handleAddCourse = async () => {
    if (!selectedCourse) {
      alert("Please select a course to add!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add course");
      }
      alert("Course added successfully!");
      fetchDashboardData(); // Refresh dashboard data
      setShowAddDropdown(false); // Hide dropdown
      setSelectedCourse(""); // Clear selection
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    }
  };

  const handleDropCourse = async () => {
    if (!selectedCourse) {
      alert("Please select a course to drop!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/student/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to drop course");
      }
      alert("Course dropped successfully!");
      fetchDashboardData(); // Refresh dashboard data
      setShowDropDropdown(false); // Hide dropdown
      setSelectedCourse(""); // Clear selection
    } catch (error) {
      console.error("Error dropping course:", error);
      alert("Failed to drop course. Please try again.");
    }
  };

  const renderCourses = (courses) => {
    return courses.map((course) => (
      <li key={course.course_id}>
        {course.course_name} (Course ID: {course.course_id})
      </li>
    ));
  };
  

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Student Dashboard</h1>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="userID" style={{ marginRight: "10px" }}>
            Enter User ID:
          </label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
            placeholder="Enter your User ID"
          />
          <button type="submit" style={{ padding: "5px 10px" }}>
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2>Welcome, User {userID}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div>
              <div style={{ marginTop: "20px" }}>
                <h3>Enrolled Courses</h3>
                {enrolledCourses.length === 0 ? (
                  <p>No enrolled courses.</p>
                ) : (
                  <ul>{renderCourses(enrolledCourses)}</ul>
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                <h3>Available Courses</h3>
                {availableCourses.length === 0 ? (
                  <p>No available courses to enroll.</p>
                ) : (
                  <ul>{renderCourses(availableCourses)}</ul>
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  style={{ padding: "5px 10px", marginRight: "10px" }}
                  onClick={() => {
                    setShowAddDropdown(!showAddDropdown);
                    setShowDropDropdown(false);
                  }}
                >
                  Add Course
                </button>
                <button
                  style={{ padding: "5px 10px" }}
                  onClick={() => {
                    setShowDropDropdown(!showDropDropdown);
                    setShowAddDropdown(false);
                  }}
                >
                  Drop Course
                </button>
              </div>
              {showAddDropdown && (
                <div style={{ marginTop: "10px" }}>
                {availableCourses.length === 0 ? (
                  <p>You have reached the maximum limit of courses (3).</p>
                ) : (
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    style={{ padding: "5px", marginRight: "10px" }}
                  >
                    <option value="">Select a course to add</option>
                    {availableCourses.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                )}
                <button onClick={handleAddCourse} style={{ padding: "5px 10px" }} disabled={availableCourses.length === 0}>
                  OK
                </button>
              </div>
              )}
              {showDropDropdown && (
                <div style={{ marginTop: "10px" }}>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    style={{ padding: "5px", marginRight: "10px" }}
                  >
                    <option value="">Select a course to drop</option>
                    {enrolledCourses.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleDropCourse} style={{ padding: "5px 10px" }}>
                    OK
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
