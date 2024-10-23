import React from "react";
import { useLocation } from "react-router-dom";
import LandingPageNavBar from "./LandingPage/LandingPageNavBar";
import FishingSpotWebsite from "./FishSpotWebsite";

interface LayoutProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  children: React.ReactNode; // To wrap the content (pages)
}

const Layout: React.FC<LayoutProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  children,
}) => {
  const location = useLocation(); // Hook to get the current path

  // Check if the current path is the landing page or login page
  const isLandingPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === '/register'

  return (
    <>
      {/* Render LandingPageNavBar for landing and login pages */}
      {isLandingPage || isLoginPage || isRegisterPage ? (
        <LandingPageNavBar />
      ) : (
        <FishingSpotWebsite
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {/* Render the page content (children passed from App.tsx) */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
