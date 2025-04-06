import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import apiService from "../apis/fetchApis.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
  const checkAuth = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Startup check - Access Token:", accessToken);
    console.log("Startup check - Refresh Token:", refreshToken);

    if (accessToken && refreshToken) {
      // Directly set logged in state from tokens
      setIsLoggedIn(true);
      
      try {
        // Try to get user data from token
        const response = await apiService.getUserProfile(); // Create this method in apiService
        if (response?.data) {
          setCurrentUser(response.data);
          setUser(response.data);
        }
      } catch (err) {
        console.error("Failed to get user profile:", err);
        // Even if profile fetch fails, keep user logged in if tokens exist
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  const login = (userData) => {
    if (!userData?.data) return;
    
    setIsLoggedIn(true);
    setUser(userData.data.userData || userData.data);
    setCurrentUser(userData.data.userData || userData.data);
    
    // Store tokens
    localStorage.setItem("accessToken", userData.data.accessToken);
    localStorage.setItem("refreshToken", userData.data.refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        currentUser,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
