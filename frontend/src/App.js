import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Dash from './Dash';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import Inbox from './inbox';
import GetCourse from './get_course';
import UserManagement from './UserManagement';
import AnnouncementsAndAlerts from './AnnouncementsandAlerts';
import Reports from './Reports';
import PostAnnouncement from './announcements';
import UploadedMaterials from './uploaded_materials';
import ViewEnrolledStudents from './ViewEnrolledStudents';
import CourseManagement from './CourseManagement';
import AssignCourses from './AssignCourses';
import StudentDashboard from './StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for Login page */}
        <Route path="/" element={<Login />} />  
        
        {/* Route for Dashboard page */}
        <Route path="/dash" element={<Dash />} />
        
        {/* Route for Signup page */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Route for Inbox page */}
        <Route path="/inbox" element={<Inbox />} />
        
        {/* Route for Admin Dashboard with dynamic username */}
        <Route path="/admin_dashboard/:user_name" element={<AdminDashboard />} />
        
        {/* Route for Dashboard with dynamic username */}
        <Route path="/dash/:user_name" element={<Dash />} />
        
        {/* Route for Student Dashboard with dynamic username */}
        <Route path="/student_dashboard/:user_name" element={<StudentDashboard />} /> 
        
        {/* Route for User Management page */}
        <Route path="/user-management" element={<UserManagement />} />
        
        {/* Route for Course Management page */}
        <Route path="/course-management" element={<CourseManagement />} />
        
        {/* Route for Announcements and Alerts page */}
        <Route path="/announcements-alerts" element={<AnnouncementsAndAlerts />} />
        
        {/* Route for Reports page */}
        <Route path="/reports" element={<Reports />} />
        
        {/* Route for viewing enrolled students */}
        <Route path="/view_enrolled_students" element={<ViewEnrolledStudents />} />
        
        {/* Route for posting announcements */}
        <Route path="/inst_announcements" element={<PostAnnouncement />} />
        
        {/* Route for Uploaded Materials page */}
        <Route path="/uploaded_materials" element={<UploadedMaterials />} />
        
        {/* Route for Assigning Courses */}
        <Route path="/assign-courses" element={<AssignCourses />} />
        
        {/* Route for displaying a specific course with dynamic parameters */}
        <Route path="/get_course/:courseId/:name/:description/:department/:instructorId" element={<GetCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
