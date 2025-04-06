import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const register = async (userData) => {
    if (!userData) return;
    setLoading(true);
    setUser(userData);
    setIsLoggedIn(true);
    setLoading(false);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const login = (userData) => {
    if (!userData) return;
    setLoading(true);
    setIsLoggedIn(true);
    setUser(userData);
    setLoading(false);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, currentUser, isLoggedIn }}
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
