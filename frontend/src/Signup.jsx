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
          body {
            margin: 0;
            font-family: Arial, sans-serif;
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
            padding: 10px 20px;
            font-size: 22px;
            text-align: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
          }

          .login-container {
            width: 100%;
            max-width: 1040px;
            padding: 0 20px;
            text-align: center;
            position: relative;
            z-index: 1;
            margin-top: 40px;
          }

          .main {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .logo h1 {
            font-size: 40px;
            font-weight: bold;
            margin: 0;
          }

          .logo p {
            margin: 0;
            font-style: italic;
          }

          .login-box {
            width: 350px;
            padding: 30px;
            border: 1px solid #f2f2f2;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
            text-align: center;
            transition: box-shadow 0.3s ease;
          }

          .login-box:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 255, 0.2);
          }

          .login-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }

          .icon {
            width: 24px;
            height: 24px;
          }

          .login-box h2 {
            margin-bottom: 10px;
          }

          form input {
            width: 100%;
            padding: 12px;
            margin: 12px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
            box-shadow: 0 0 5px rgba(173, 216, 230, 0.6);
          }

          .login-button {
            width: 100%;
            padding: 12px;
            background-color: #d32f2f;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
          }

          .side-image-container {
            position: absolute;
            top: -10px;
            right: -500px;
            width: 200px;
            height: 200%;
            overflow: hidden;
            z-index: 0;
          }

          .side-image {
            width: 560px;
            height: auto;
            position: relative;
            left: -85px;
          }
        `}
      </style>
      <header className="header">
        <h1>TerpEdu</h1>
      </header>

      <div className="login-container">
        <main className="main">
          <div className="logo">
            <img src="/TerpEdu.png" alt="TerpEdu Logo" />
          </div>
          <div className="login-box">
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
