import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if the user is logged in
  return <>{children}</>;
};

export default ProtectedRoute;