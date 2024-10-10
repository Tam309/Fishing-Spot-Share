import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'; // Import the CSS file
import axios from 'axios';


const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3001/register', {
        user_name: username,
        email: email,
        password: password
    });
    if(response.status === 200) {
      console.log(response);
      navigate('/login');
    }
  } catch(error) {
    console.log(error)
  }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register for FishSpot</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
              placeholder="Enter your username"
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input"
              placeholder="Re-enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>
        </form>
        {/* Link to Login */}
        <p className="register-link">
          Already have an account?{' '}
          <Link to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
