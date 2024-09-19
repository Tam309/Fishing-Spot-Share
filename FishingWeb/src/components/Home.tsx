import React from "react";
import './Home.css';

export default function Home() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">Fishing Spot Share</div>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">Explore</a>
          </li>
          <li>
            <a href="#services">My spot</a>
          </li>
          <li>
            <a href="#contact">Profile</a>
          </li>
        </ul>
      </header>
      <div className="body">
        <div className="create-post"></div>
        <div className="posts"></div>
      </div>
      <div className="footer"></div>
    </div>
  );
}
