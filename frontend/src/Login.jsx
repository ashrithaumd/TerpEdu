import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
function Login() {
    const navigate = useNavigate(); 
    const handleSubmit = (event) => {
      event.preventDefault(); 
      navigate('/dash');
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
            margin-top: 60px;
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
            transition: box-shadow 0.3s ease; /* Smooth transition */
          }

          .login-box:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 255, 0.2); /* Intense blue shadow on hover */
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
          }

          .forgot-password {
            display: block;
            margin-top: 10px;
            color: #d32f2f;
            font-size: 14px;
            text-decoration: none;
          }

          .side-image-container {
            position: absolute;
            top: -20px;
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
            <img src="frontend/public/TerpEdu.png" alt="TerpEdu Logo" />
          </div>
          <div className="login-box">
            <h3>LOGIN</h3>
            <div className="login-icons">
              <img src="graduation-hat.png" alt="Graduation Hat" className="icon" />
              <span>x</span>
              <img src="maryland-logo.png" alt="Maryland Logo" className="icon" />
            </div>
            <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit" className="login-button">Login</button>
            </form>
            <a href="/" className="forgot-password">Forgot password?</a>
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

export default Login;
