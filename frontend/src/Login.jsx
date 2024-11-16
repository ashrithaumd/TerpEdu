import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dash');
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log("signup button clicked");
    navigate('/signup');
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
            margin-top: 10px;
          }

          .signup-button {
            width: 100%;
            padding: 5%;
            margin-top: 5px;
            background-color: #d32f2f;
            color: white;
            cursor: pointer;
            border: none;
            border-radius: 5px;
          }
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
            <h3>LOGIN</h3>
            <div className="login-icons">
              <img src="graduation-hat.png" alt="Graduation Hat" className="icon" />
              <span>x</span>
              <img src="maryland-logo.png" alt="Maryland Logo" className="icon" />
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" name="UserID" placeholder="UserID" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit" className="login-button">Login</button>
            </form>
            <button onClick={handleSignup} className="signup-button">Signup</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
