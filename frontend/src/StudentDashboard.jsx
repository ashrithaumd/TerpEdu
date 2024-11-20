// import React, { useState } from "react";
// import { useParams } from "react-router-dom";


// function StudentDashboard() {
// const { user_name } = useParams();
//   const [userID, setUserID] = useState(""); // State to store user input
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
//   const [enrolledCourses, setEnrolledCourses] = useState([]); // Enrolled courses
//   const [availableCourses, setAvailableCourses] = useState([]); // Available courses
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(""); // Error state
//   const [showAddDropdown, setShowAddDropdown] = useState(false); // Show Add dropdown
//   const [showDropDropdown, setShowDropDropdown] = useState(false); // Show Drop dropdown
//   const [selectedCourse, setSelectedCourse] = useState(""); // Selected course for add/drop

//   // Fetch data for the dashboard
//   const fetchDashboardData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/student/dashboard/${userID}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch dashboard data");
//       }
//       const data = await response.json();
//       console.log("Dashboard data:", data); // Debugging output
//       setEnrolledCourses(
//         (data.enrolled_courses || []).map((course) => ({
//           course_id: course[0],
//           course_name: course[1],
//           description: course[2],
//           credits: course[3],
//           department: course[4],
//           semester: course[5],
//           is_currently_active: course[6],
//         }))
//       );
//       setAvailableCourses(data.available_courses || []);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       setError("Failed to load data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (userID.trim() === "") {
//       alert("Please enter a valid UserID");
//       return;
//     }
//     fetchDashboardData();
//   };

//   const handleAddCourse = async () => {
//     if (!selectedCourse) {
//       alert("Please select a course to add!");
//       return;
//     }
//     try {
//       const response = await fetch("http://127.0.0.1:5000/student/enroll", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to add course");
//       }
//       alert("Course added successfully!");
//       fetchDashboardData(); // Refresh dashboard data
//       setShowAddDropdown(false); // Hide dropdown
//       setSelectedCourse(""); // Clear selection
//     } catch (error) {
//       console.error("Error adding course:", error);
//       alert("Failed to add course. Please try again.");
//     }
//   };

//   const handleDropCourse = async () => {
//     if (!selectedCourse) {
//       alert("Please select a course to drop!");
//       return;
//     }
//     try {
//       const response = await fetch("http://127.0.0.1:5000/student/drop", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to drop course");
//       }
//       alert("Course dropped successfully!");
//       fetchDashboardData(); // Refresh dashboard data
//       setShowDropDropdown(false); // Hide dropdown
//       setSelectedCourse(""); // Clear selection
//     } catch (error) {
//       console.error("Error dropping course:", error);
//       alert("Failed to drop course. Please try again.");
//     }
//   };

//   const renderCourses = (courses) => {
//     return courses.map((course) => (
//       <li key={course.course_id}>
//         {course.course_name} (Course ID: {course.course_id})
//       </li>
//     ));
//   };
  

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Student Dashboard</h1>
//       <h3>welcom {user_name}</h3>
//       {!isLoggedIn ? (
//         <form onSubmit={handleLogin}>
//           <label htmlFor="userID" style={{ marginRight: "10px" }}>
//             Enter User ID:
//           </label>
//           <input
//             type="text"
//             id="userID"
//             value={userID}
//             onChange={(e) => setUserID(e.target.value)}
//             style={{ padding: "5px", marginRight: "10px" }}
//             placeholder="Enter your User ID"
//           />
//           <button type="submit" style={{ padding: "5px 10px" }}>
//             Submit
//           </button>
//         </form>
//       ) : (
//         <div>
//           <h2>Welcome, User {userID}</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p style={{ color: "red" }}>{error}</p>
//           ) : (
//             <div>
//               <div style={{ marginTop: "20px" }}>
//                 <h3>Enrolled Courses</h3>
//                 {enrolledCourses.length === 0 ? (
//                   <p>No enrolled courses.</p>
//                 ) : (
//                   <ul>{renderCourses(enrolledCourses)}</ul>
//                 )}
//               </div>
//               <div style={{ marginTop: "20px" }}>
//                 <h3>Available Courses</h3>
//                 {availableCourses.length === 0 ? (
//                   <p>No available courses to enroll.</p>
//                 ) : (
//                   <ul>{renderCourses(availableCourses)}</ul>
//                 )}
//               </div>
//               <div style={{ marginTop: "20px" }}>
//                 <button
//                   style={{ padding: "5px 10px", marginRight: "10px" }}
//                   onClick={() => {
//                     setShowAddDropdown(!showAddDropdown);
//                     setShowDropDropdown(false);
//                   }}
//                 >
//                   Add Course
//                 </button>
//                 <button
//                   style={{ padding: "5px 10px" }}
//                   onClick={() => {
//                     setShowDropDropdown(!showDropDropdown);
//                     setShowAddDropdown(false);
//                   }}
//                 >
//                   Drop Course
//                 </button>
//               </div>
//               {showAddDropdown && (
//                 <div style={{ marginTop: "10px" }}>
//                 {availableCourses.length === 0 ? (
//                   <p>You have reached the maximum limit of courses (3).</p>
//                 ) : (
//                   <select
//                     value={selectedCourse}
//                     onChange={(e) => setSelectedCourse(e.target.value)}
//                     style={{ padding: "5px", marginRight: "10px" }}
//                   >
//                     <option value="">Select a course to add</option>
//                     {availableCourses.map((course) => (
//                       <option key={course.course_id} value={course.course_id}>
//                         {course.course_name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 <button onClick={handleAddCourse} style={{ padding: "5px 10px" }} disabled={availableCourses.length === 0}>
//                   OK
//                 </button>
//               </div>
//               )}
//               {showDropDropdown && (
//                 <div style={{ marginTop: "10px" }}>
//                   <select
//                     value={selectedCourse}
//                     onChange={(e) => setSelectedCourse(e.target.value)}
//                     style={{ padding: "5px", marginRight: "10px" }}
//                   >
//                     <option value="">Select a course to drop</option>
//                     {enrolledCourses.map((course) => (
//                       <option key={course.course_id} value={course.course_id}>
//                         {course.course_name}
//                       </option>
//                     ))}
//                   </select>
//                   <button onClick={handleDropCourse} style={{ padding: "5px 10px" }}>
//                     OK
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentDashboard;


import React, { useState } from "react";
import { useParams } from "react-router-dom";

function StudentDashboard() {
  const { user_name } = useParams();
  const [userID, setUserID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showDropDropdown, setShowDropDropdown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  // Fetch data for the dashboard
  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/student/dashboard/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      console.log("Dashboard data:", data);
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
      const response = await fetch("/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add course");
      }
      alert("Course added successfully!");
      fetchDashboardData();
      setShowAddDropdown(false);
      setSelectedCourse("");
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
      const response = await fetch("/student/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, course_id: selectedCourse }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to drop course");
      }
      alert("Course dropped successfully!");
      fetchDashboardData();
      setShowDropDropdown(false);
      setSelectedCourse("");
    } catch (error) {
      console.error("Error dropping course:", error);
      alert("Failed to drop course. Please try again.");
    }
  };

  const renderCourses = (courses) => {
    return courses.map((course) => (
      <li key={course.course_id} className="course-item">
        {course.course_name} (Course ID: {course.course_id})
      </li>
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            background-color: #f9f9f9;
          }

          .header {
            width: 100%;
            background-color: #D32F2F;
            color: white;
            padding: 15px 20px;
            font-size: 28px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
          }

          .header .welcome-message {
            font-size: 20px;
          }

          .logo-container {
            display: flex;
            justify-content: center;
            margin: 80px 0 20px;
          }

          .logo-container img {
            max-width: 350px;
            height: auto;
          }

          .turtle-image {
            position: absolute;
            right: 0;
            bottom: 0;
            max-height: calc(100vh - 80px);
            max-width: 350px;
            opacity: 0.5;
          }

          .content-container {
            max-width: 600px;
            margin: 0 auto;
            margin-top: 150px;
            text-align: center;
          }

          .form-container {
            margin-top: 30px;
          }

          input, button {
            padding: 12px;
            margin: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
          }

          button {
            background-color: #D32F2F;
            color: white;
            cursor: pointer;
          }

          button:hover {
            background-color: #b71c1c;
          }

          .text-large {
            font-size: 20px;
            margin-top: 20px;
          }

          .courses-section {
            margin-top: 30px;
            text-align: left;
          }

          .courses-section h3 {
            font-size: 22px;
            margin-bottom: 10px;
          }

          .course-item {
            font-size: 18px;
            padding: 8px;
            border-bottom: 1px solid #ddd;
          }

          .dropdown-container, .action-buttons {
            margin-top: 20px;
            text-align: center;
          }

          .dropdown-container select {
            padding: 10px;
            font-size: 16px;
            margin-right: 10px;
          }

          .dropdown-container button {
            padding: 10px 20px;
            font-size: 16px;
          }
        `}
      </style>

      <header className="header">
        <span>TerpEdu</span>
        <div className="welcome-message">Welcome, {user_name}</div>
      </header>

      <div className="logo-container">
        <img src="/TerpEdu.png" alt="TerpEdu Logo" />
      </div>

      <div className="content-container">
        <h1>Student Dashboard</h1>
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="form-container">
            <label htmlFor="userID" className="text-large">Enter User ID:</label>
            <input
              type="text"
              id="userID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              placeholder="Enter your User ID"
              className="text-large"
            />
            <button type="submit" className="text-large">Submit</button>
          </form>
        ) : (
          <div>
            <h2 className="text-large">Welcome, User {userID}</h2>
            {loading ? (
              <p className="text-large">Loading...</p>
            ) : error ? (
              <p className="text-large" style={{ color: "red" }}>{error}</p>
            ) : (
              <div>
                <div className="courses-section">
                  <h3>Enrolled Courses</h3>
                  {enrolledCourses.length === 0 ? (
                    <p className="text-large">No enrolled courses.</p>
                  ) : (
                    <ul>{renderCourses(enrolledCourses)}</ul>
                  )}
                </div>
                <div className="courses-section">
                  <h3>Available Courses</h3>
                  {availableCourses.length === 0 ? (
                    <p className="text-large">No available courses to enroll.</p>
                  ) : (
                    <ul>{renderCourses(availableCourses)}</ul>
                  )}
                </div>
                <div className="action-buttons">
                  <button
                    onClick={() => {
                      setShowAddDropdown(!showAddDropdown);
                      setShowDropDropdown(false);
                    }}
                    className="text-large"
                  >
                    Add Course
                  </button>
                  <button
                    onClick={() => {
                      setShowDropDropdown(!showDropDropdown);
                      setShowAddDropdown(false);
                    }}
                    className="text-large"
                  >
                    Drop Course
                  </button>
                </div>
                {showAddDropdown && (
                  <div className="dropdown-container">
                    {availableCourses.length === 0 ? (
                      <p className="text-large">You have reached the maximum limit of courses (3).</p>
                    ) : (
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="text-large"
                      >
                        <option value="">Select a course to add</option>
                        {availableCourses.map((course) => (
                          <option key={course.course_id} value={course.course_id}>
                            {course.course_name}
                          </option>
                        ))}
                      </select>
                    )}
                    <button onClick={handleAddCourse} className="text-large" disabled={availableCourses.length === 0}>
                      OK
                    </button>
                  </div>
                )}
                {showDropDropdown && (
                  <div className="dropdown-container">
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="text-large"
                    >
                      <option value="">Select a course to drop</option>
                      {enrolledCourses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_name}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleDropCourse} className="text-large">
                      OK
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <img src="/turtle.png" alt="Turtle" className="turtle-image" />
    </div>
  );
}

export default StudentDashboard;
