import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import apiService from "../apis/fetchApis.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in - simplified to a single function
  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      
      console.log("Auth check - Tokens:", { accessToken: !!accessToken, refreshToken: !!refreshToken });
      
      if (!refreshToken) {
        console.log("No refresh token found, user is not logged in");
        setLoading(false);
        return;
      }
      
      try {
        // First try using the current access token
        if (accessToken) {
          try {
            const userResponse = await apiService.getCurrentUser();
            if (userResponse?.data) {
              console.log("User authenticated with current token");
              setUser(userResponse.data);
              setIsLoggedIn(true);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.log("Current access token invalid, will try refresh", error);
            // Continue to refresh token flow
          }
        }
        
        // If we get here, we need to refresh the token
        const response = await apiService.refreshAccessToken(refreshToken);
        
        if (!response || !response.data) {
          throw new Error("Failed to refresh token - invalid response");
        }
        
        // Extract data based on your API response structure
        const responseData = response.data.data || response.data;
        const userData = responseData.userData || responseData;
        const newAccessToken = responseData.accessToken;
        const newRefreshToken = responseData.refreshToken;
        
        if (!userData || !newAccessToken || !newRefreshToken) {
          throw new Error("Invalid response format from refresh token API");
        }
        
        // Update tokens in localStorage
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        
        // Update state
        setUser(userData);
        setIsLoggedIn(true);
        console.log("Authentication restored via token refresh");
      } catch (error) {
        console.error("Authentication failed:", error);
        // Clear invalid tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    if (!userData?.data) {
      console.error("Invalid login data received:", userData);
      return;
    }

    // Extract data based on your API response structure
    const responseData = userData.data;
    const user = responseData.userData || responseData;
    const accessToken = responseData.accessToken;
    const refreshToken = responseData.refreshToken;
    
    if (!user || !accessToken || !refreshToken) {
      console.error("Missing required login data", { user, accessToken: !!accessToken, refreshToken: !!refreshToken });
      return;
    }
    
    // Store tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    // Update state
    setUser(user);
    setIsLoggedIn(true);
    
    console.log("User logged in successfully");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
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