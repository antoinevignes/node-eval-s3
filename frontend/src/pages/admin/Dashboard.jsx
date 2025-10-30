import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import CompanyDonut from "../../components/charts/CompanyDonut";
import { MaterialBarChart } from "../../components/charts/MaterialBarChart";
import FurnitureTable from "../../components/FurnitureTable";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const shownToast = useRef(false);
  const { user, loading } = useAuth();

  // Renvoi si pas connecté
  useEffect(() => {
    if (!user && !loading) {
      navigate("/user/login", { state: { error: true } });
    }
  }, [loading, user, navigate]);

  // Toaster
  useEffect(() => {
    if (location.state?.success && !shownToast.current) {
      shownToast.current = true;
      toast.success("Meuble ajouté !");
      navigate("/admin/dashboard", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  return (
    <section className="p-10 grid grid-cols-3 gap-4">
      <MaterialBarChart />

      <CompanyDonut />

      <FurnitureTable />
    </section>
  );
}
