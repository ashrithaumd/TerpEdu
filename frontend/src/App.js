import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Dash from './Dash';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import Inbox from './inbox';
import ViewInstCourses from './View_inst_courses';
import UserManagement from './UserManagement';
import AnnouncementsAndAlerts from './AnnouncementsandAlerts';
import Reports from './Reports';

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
        <Route path="/View_inst_courses" element={<ViewInstCourses />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/course-management" element={<CourseManagement/>} />
        <Route path="/announcements-alerts" element={<AnnouncementsAndAlerts />} />
        <Route path="/reports" element={<Reports />} />
       
        <Route path="/assign-courses" element={<AssignCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
