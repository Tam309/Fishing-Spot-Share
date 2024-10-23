import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        user_name: username,
        password: password
      });
      if(response.status === 200) {
        const user_id = response.data.user_id;
        localStorage.setItem("user_id", user_id.toString());
        setIsLoggedIn(true); // Update login state
        navigate('/home');
      }
    } catch (error) {
      setError('Invalid username or password! Please try again');
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to FishSpot</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="register-link">Don't have an account?</p>
        <button onClick={handleRegister} className="register-btn">Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
