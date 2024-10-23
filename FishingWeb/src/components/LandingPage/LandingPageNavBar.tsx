import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const LandingPageNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">FishSpot</h1>

        {/* Remove other navigation links */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* Login/Logout button */}
              <Link to="/profile" className="hover:text-blue-200">
                Login
              </Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-200">Login</Link>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <BiMenu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavBar;
