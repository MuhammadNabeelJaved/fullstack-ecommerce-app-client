// Use context api for protecting routes
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contextApi/context.jsx";
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
