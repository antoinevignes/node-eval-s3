import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
    setLoading(false);
  }, []);

  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    setUser(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const values = { user, login, logout, loading };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
