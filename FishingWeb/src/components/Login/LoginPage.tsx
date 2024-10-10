import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }

    // Simulate login success
    onLogin(username);
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to FishSpot</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
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
          {/* Password Field */}
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
          {/* Submit Button */}
          <button type="submit" className="submit-btn">Login</button>
        </form>
        {/* Register Link */}
        <p className="register-link">
          Don't have an account?
        </p>
        <button onClick={handleRegister} className="register-btn">Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
