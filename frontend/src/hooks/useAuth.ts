import { useEffect, useState } from "react";
import { getStoredToken, getStoredUser, clearAuthData } from "../services/auth";

export default function useAuth() {
  const [user, setUser] = useState(getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    const token = getStoredToken();
    setIsAuthenticated(Boolean(token));
    setUser(getStoredUser());
  }, []);

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
  };

  return { user, isAuthenticated, logout };
}
