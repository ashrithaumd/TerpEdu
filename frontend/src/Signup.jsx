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
            align-items: center;
            height: 100vh;
            background-color: #fff;
            overflow: hidden;
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
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 100px;
            padding: 20px;
            position: relative;
          }

          .signup-box {
            width: 100%;
            max-width: 350px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            border: 2px solid #f0b0b0;
            background-color: #fff;
            text-align: center;
            margin: auto;
          }

          .signup-box h1 {
            font-size: 28px;
            font-family: 'Open Sans', sans-serif;
            margin-bottom: 10px;
            color: #333;
          }

          form input, form select {
            width: calc(100% - 20px);
            padding: 8px;
            margin: 6px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-family: 'Open Sans', sans-serif;
          }

          .signup-button {
            width: 100%;
            padding: 10px;
            background-color: #d32f2f;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;
            margin-top: 8px;
          }

          .signup-button:hover {
            background-color: #b71c1c;
          }

          .terpedu-logo-container {
            position: absolute;
            left: 5%;
            transform: translateY(-50%);
            top: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .side-image-container {
            position: fixed;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 250px;
            height: auto;
            z-index: 0;
          }

          .side-image {
            width: 250px;
            height: auto;
          }
        `}
      </style>

      <header className="header">
        <h1>TerpEdu</h1>
      </header>

      <div className="signup-container">
        <div className="terpedu-logo-container">
          <img
            src="/TerpEdu.png"
            alt="TerpEdu Logo"
            style={{ maxWidth: '180px', height: 'auto' }}
          />
        </div>
        <div className="signup-box">
          <h1>SIGN UP</h1>
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
      </div>

      <div className="side-image-container">
        <img
          src="/turtle.png"
          alt="Side Turtle"
          className="side-image"
        />
      </div>
    </div>
  );
}

export default Signup;
