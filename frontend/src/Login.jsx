import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userID,
          password: password
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        if (data.role === 'Admin') {
          navigate(`/admin_dashboard/${encodeURIComponent(data.user_name)}`);
        } else if (data.role === 'Student') {
          navigate(`/student_dashboard/${encodeURIComponent(data.user_name)}`);
        } else if (data.role === 'Instructor') {
          navigate(`/dash/${encodeURIComponent(data.user_name)}`);
        } else {
          alert('No specific dashboard available for this role.');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    navigate('/signup');
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

          .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 600px; /* Increased width */
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

          .login-box {
            width: 100%;
            max-width: 500px; /* Increased width */
            padding: 40px; /* Increased padding */
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            border: 2px solid #f0b0b0;
            background-color: #fff;
            text-align: center;
            margin-top: 10px;
          }

          .login-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px; /* Increased margin */
            font-size: 24px; /* Increased size for 'x' */
          }

          .icon {
            width: 70px; /* Increased size */
            height: 70px; /* Increased size */
            margin: 0 15px; /* Increased margin */
          }

          .login-box h3 {
            font-size: 36px; /* Increased size */
            font-family: 'Open Sans', sans-serif;
            margin-bottom: 20px; /* Increased margin */
            color: #333;
          }

          form input {
            width: 100%;
            padding: 14px; /* Increased padding */
            margin: 12px 0; /* Increased margin */
            border-radius: 5px;
            border: 1px solid #ddd;
            font-family: 'Open Sans', sans-serif;
          }

          .login-button {
            width: 100%;
            padding: 14px; /* Increased padding */
            background-color: #d32f2f;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;
            margin-top: 12px; /* Increased margin */
          }

          .login-button:hover {
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

      <div className="login-container">
        <main className="main">
          <div className="logo">
            <img src="/TerpEdu.png" alt="TerpEdu Logo" />
          </div>
          <div className="login-box">
            <h3>LOGIN</h3>
            <div className="login-icons">
              <img src="graduation-hat.png" alt="Graduation Hat" className="icon" />
              <span>x</span>
              <img src="maryland-logo.png" alt="Maryland Logo" className="icon" />
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="UserID"
                placeholder="UserID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-button">Login</button>
            </form>
            <button onClick={handleSignup} className="login-button">Signup</button>
          </div>
        </main>
      </div>
      <div className="side-image-container">
        <img src="turtle.png" alt="Turtle" className="side-image" />
      </div>
    </div>
  );
}

export default Login;
