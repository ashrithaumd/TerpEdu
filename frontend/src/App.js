import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Dash from './Dash';
import Signup from './Signup';
import Inbox from './inbox';
import GetCourse from './get_course';
import PostAnnouncement from './announcements';
import UploadedMaterials from './uploaded_materials';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Default route to Login */}
        <Route path="/dash" element={<Dash />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/announcements" element={<PostAnnouncement />} />
        <Route path="/uploaded_materials" element={<UploadedMaterials />} />
        <Route path="/get_course/:courseId/:name/:description/:department/:instructorId" element={<GetCourse />} />

      </Routes>
    </Router>
  );
}

export default App;
