import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserID: '',
    name: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phoneNumber: ''
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
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            display: flex;
            justify-content: center;
            align-items: flex-start; /* Changed from center to flex-start */
            height: 100vh;
            background-color: #fff;
            overflow-y: auto; /* Makes the page scrollable */
          }

          .header {
            width: 100%;
            background-color: #d32f2f;
            color: white;
            height: 70px;
            padding: 0 20px;
            font-size: 22px;
            font-family: 'Open Sans', sans-serif;
            font-weight: 400;
            text-align: left;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
            display: flex;
            align-items: center;
          }

          .signup-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 600px; /* Match the login max width */
            margin-top: 100px;
            padding: 20px;
          }

          .logo {
            margin-bottom: 20px;
            text-align: center;
          }

          .logo img {
            max-width: 300px;
            height: auto;
          }

          .signup-box {
            width: 100%;
            max-width: 500px; /* Match the login box width */
            padding: 40px; /* Match the padding of login box */
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            border: 2px solid #f0b0b0;
            background-color: #fff;
            text-align: center;
            margin-top: 10px;
          }

          .signup-box h3 {
            font-size: 36px; /* Match the login heading size */
            font-family: 'Open Sans', sans-serif;
            margin-bottom: 20px;
            color: #333;
          }

          form input, form select {
            width: 100%;
            padding: 14px; /* Match padding of login inputs */
            margin: 12px 0; /* Match margin of login inputs */
            border-radius: 5px;
            border: 1px solid #ddd;
            font-family: 'Open Sans', sans-serif;
          }

          .signup-button {
            width: 100%;
            padding: 14px; /* Match padding of login button */
            background-color: #d32f2f;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;
            margin-top: 12px; /* Match margin of login button */
          }

          .signup-button:hover {
            background-color: #b71c1c;
          }

          .side-image-container {
            position: fixed;
            top: 70px; /* Align with bottom of header */
            right: 0;
            bottom: 0; /* Extend to bottom of screen */
            z-index: 0;
          }

          .side-image {
            height: 100%; /* Stretch to fill container height */
            width: auto; /* Maintain aspect ratio */
          }
        `}
      </style>

      <header className="header">
        <h1>TerpEdu</h1>
      </header>

      <div className="signup-container">
        <main className="main">
          <div className="logo">
            <img src="/TerpEdu.png" alt="TerpEdu Logo" />
          </div>
          <div className="signup-box">
            <h3>SIGN UP</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="UserID"
                placeholder="UserID"
                required
                value={formData.UserID}
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
                <option value="Instructor">Instructor</option>
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
              <button type="submit" className="signup-button">Sign Up</button>
            </form>
          </div>
        </main>
      </div>
      <div className="side-image-container">
        <img src="turtle.png" alt="Turtle" className="side-image" />
      </div>
    </div>
  );
}

export default Signup;
