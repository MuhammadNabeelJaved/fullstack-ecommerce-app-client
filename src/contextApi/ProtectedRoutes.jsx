// Use context api for protecting routes
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contextApi/context.jsx";
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();
  const redirectPath = location || "/cms";
  return user ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
