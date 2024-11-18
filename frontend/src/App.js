import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Dash from './Dash';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import Inbox from './inbox';
import GetCourse from './get_course';
import UserManagement from './UserManagement'
import AnnouncementsAndAlerts from './AnnouncementsandAlerts';
import Reports from './Reports';
import PostAnnouncement from './announcements';
import UploadedMaterials from './uploaded_materials';
import Calendar from './calender';
import CourseManagement from './CourseManagement';
import AssignCourses from './AssignCourses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Default route to Login */}
        <Route path="/dash" element={<Dash />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/course-management" element={<CourseManagement />} />
        <Route path="/announcements-alerts" element={<AnnouncementsAndAlerts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/calender" element={<Calendar />} />
        <Route path="/announcements" element={<PostAnnouncement />} />
        <Route path="/uploaded_materials" element={<UploadedMaterials />} />
        <Route path="/assign-courses" element={<AssignCourses />} />
        <Route path="/get_course/:courseId/:name/:description/:department/:instructorId" element={<GetCourse />} />

      </Routes>
    </Router>
  );
}

export default App;
