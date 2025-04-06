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
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    apiService
      .refreshAccessToken(accessToken, refreshToken)
      .then((response) => {
        login(response);
        setLoading(false);
        setIsLoggedIn(true);
        setCurrentUser(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const register = async (userData) => {
    if (!userData) return;
    setLoading(true);
    setUser(userData);
    setIsLoggedIn(true);
    setLoading(false);
    console.log("Registered User data:", userData);
    setCurrentUser(userData);
    // localStorage.setItem("user", JSON.stringify(userData));
  };
  const verifyEmail = (userData) => {
    if (!userData) return;
    setLoading(true);
    setUser(userData);
    setIsLoggedIn(true);
    setLoading(false);
    console.log("Email verified:", userData);
    setCurrentUser(userData);
    localStorage.setItem("accessToken", JSON.stringify(userData.accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(userData.refreshToken));
  };
  const login = (userData) => {
    if (!userData) return;
    setLoading(true);
    setIsLoggedIn(true);
    setUser(userData);
    setLoading(false);
    console.log("User data:", userData?.data);
    setCurrentUser(userData);
    localStorage.setItem(
      "accessToken",
      JSON.stringify(userData?.data?.accessToken)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(userData?.data?.refreshToken)
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        verifyEmail,
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
