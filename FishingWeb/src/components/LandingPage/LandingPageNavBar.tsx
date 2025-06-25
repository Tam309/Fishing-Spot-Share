import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

const LandingPageNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return (
    <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <h1 className="text-2xl text-white font-bold">FishSpot</h1>
        </Link>


        {/* Remove other navigation links */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* Login/Logout button */}
              <Link to="/profile" className="hover:text-blue-200">
                <FaUser className="inline mr-1" />
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

      {/* Mobile Menu (conditional rendering based on isMenuOpen state) */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-4">
          {isLoggedIn ? (
            <Link to="/profile" className="block text-white hover:text-blue-200">
              <FaUser className="inline mr-1" />
            </Link>
          ) : (
            <Link to="/login" className="block text-white hover:text-blue-200">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavBar;
