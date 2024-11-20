import React, { useState } from "react";

function StudentDashboard() {
  const [userID, setUserID] = useState(""); // State to store user input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Enrolled courses
  const [availableCourses, setAvailableCourses] = useState([]); // Available courses
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

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
      setEnrolledCourses(data.enrolled_courses || []);
      setAvailableCourses(data.available_courses || []);
      setIsLoggedIn(true); // Mark user as logged in
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (userID.trim() === "") {
      alert("Please enter a valid UserID");
      return;
    }
    fetchDashboardData(); // Fetch data on login
  };

  const renderCourses = (courses) =>
    courses.map((course, index) => (
      <li key={index}>
        {course.course_name} (ID: {course.course_id})
      </li>
    ));

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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
