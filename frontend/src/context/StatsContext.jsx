import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user, loading } = useContext(AuthContext);

  const [companyStats, setCompanyStats] = useState([]);
  const [materialStats, setMaterialStats] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function fetchStats() {
    if (loading || !user) return;

    try {
      setIsRefreshing(true);

      const [companyRes, materialRes] = await Promise.all([
        fetch(`${API_URL}/stats/by-company`, {
          headers: { Authorization: `Bearer ${user}` },
        }),
        fetch(`${API_URL}/stats/by-material`, {
          headers: { Authorization: `Bearer ${user}` },
        }),
      ]);

      const [companyData, materialData] = await Promise.all([
        companyRes.json(),
        materialRes.json(),
      ]);

      setCompanyStats(companyData);
      setMaterialStats(materialData);
    } catch (error) {
      console.error("Erreur chargement stats :", error);
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [user, loading]);

  return (
    <StatsContext.Provider
      value={{
        companyStats,
        materialStats,
        refreshStats: fetchStats,
        isRefreshing,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}
