import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("decodedtoken");

  if (!isAuthenticated && path !== "/") {
    return <Navigate to="/" />;
  }

  if (isAuthenticated && path === "/") {
    return <Navigate to="/activities" />;
  }
  return element;
};
export default ProtectedRoute;
