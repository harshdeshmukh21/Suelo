import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  // Check if the user is trying to access a protected route
  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/events" ||
    location.pathname === "/map"
  ) {
    return isAuthenticated() ? (
      children
    ) : (
      <Navigate to="/auth" state={{ from: location.pathname }} replace />
    );
  }

  // If the user is not trying to access a protected route, render the children
  return <>{children}</>;
};

export { PrivateRoute };
