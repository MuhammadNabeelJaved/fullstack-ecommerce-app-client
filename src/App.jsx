import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import apiService from "./apis/fetchApis.js";
import { useEffect } from "react";
import { useAuth } from "./contextApi/context.jsx";

function App() {
  const { getCurrentUser } = apiService;
  const { user, loading, currentUser, isLoggedIn } = useAuth();
  useEffect(() => {
    const getUser = async () => {
      getCurrentUser()
        .then((response) => {
          console.log("Current user data in App:", response);
          if (!response) {
            console.error("Login failed. No response received.");
          }
          // Set user data in context
          currentUser(response.data);
          user(response.data);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
