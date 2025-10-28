import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
  }, []);

  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    setUser(token);
    navigate("/");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }, []);

  const values = { user, login, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
