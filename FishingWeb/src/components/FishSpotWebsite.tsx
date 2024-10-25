import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

interface FishingSpotWebsiteProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const FishingSpotWebsite: React.FC<FishingSpotWebsiteProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIsMenuOpen(false);
    navigate("/");
  };
  
  if(isLoggedIn == true){
    console.log("true");
  }
  return (
    <div className="min-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">FishSpot</h1>
          <div className="hidden md:flex space-x-4">
            <Link to="/home" className="hover:text-blue-200">Home</Link>
            <Link to="/explore" className="hover:text-blue-200">Explore Spots</Link>
            <Link to="/upload" className="hover:text-blue-200">Upload Spot</Link>
            <Link to="/mySpots" className="hover:text-blue-200">My Spots</Link>
            <Link to="/sharedSpots" className="hover:text-blue-200">Shared Spots</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="hover:text-blue-200 flex items-center">
                  <FaUser className="mr-1" /> {username}
                </Link>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-200">Login</Link>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <BiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mt-[4rem]">
        {isMenuOpen && (
          <div className="md:hidden bg-blue-500 p-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">Home</Link>
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">Explore Spots</Link>
            <Link to="/upload" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">Upload Spot</Link>
            <Link to="/mySpots" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">My Spots</Link>
            <Link to="/sharedSpots" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">Shared Spots</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">
                  <FaUser className="mr-1" /> {username}
                </Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-white hover:bg-blue-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-white hover:bg-blue-600">
                Login
              </Link>
            )}
          </div>
        )}

        <div className="container mx-auto mt-4">
          {/* Your content like Explore Spots or other components */}
        </div>
      </div>
    </div>
  );
};

export default FishingSpotWebsite;
