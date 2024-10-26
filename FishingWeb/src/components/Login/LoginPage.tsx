import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';

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
        localStorage.setItem("loggedIn", "true");
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
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Login to FishSpot</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>
        <p className={styles.registerLink}>Don't have an account?</p>
        <button onClick={handleRegister} className={styles.registerBtn}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
