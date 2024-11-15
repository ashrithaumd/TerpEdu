import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserID: '',
    name: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/user/create_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful signup (e.g., navigate to login page)
        navigate('/');
      } else {
        // Handle errors here
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <style>
        {`
          /* CSS styles here */
        `}
      </style>

      <header className="header">
        <h1>TerpEdu</h1>
      </header>

      <div className="login-container">
        <main className="main">
          <div className="logo">
            <img src="./frontend/public/TerpEdu.png" alt="TerpEdu Logo" />
          </div>
          <div className="login-box">
            <h3>SIGN UP</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userId"
                placeholder="UserId"
                required
                value={formData.userId}
                onChange={handleChange}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <button type="submit" className="login-button">Sign Up</button>
            </form>
          </div>
        </main>

        <div className="side-image-container">
          <img
            src="https://media.istockphoto.com/id/1700535742/vector/turtle-icon.jpg?s=2048x2048&w=is&k=20&c=ZdczUpIyBaX2ymL9bs_i_SKQZUaEcogf4XdNPhB0Dbw="
            alt="Side Turtle"
            className="side-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
