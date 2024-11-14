import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';  // Ensure you import the Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Default route to Login */}
      </Routes>
    </Router>
  );
}

export default App;
