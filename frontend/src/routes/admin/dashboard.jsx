import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from "react";
import { MaterialBarChart } from "../../components/charts/MaterialBarChart";
import CompanyDonut from "../../components/charts/CompanyDonut";
import FurnitureTable from "../../components/FurnitureTable";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const shownToast = useRef(false);
  const { user, loading } = useAuth();

  //   Renvoi si pas connecté
  useEffect(() => {
    if (!user && !loading) {
      navigate({ to: "/user/login", state: { error: true } });
    }
  }, [loading, user, navigate]);

  // Toaster
  useEffect(() => {
    if (location.state?.success && !shownToast.current) {
      shownToast.current = true;
      toast.success("Meuble ajouté !");
      navigate({ to: "/admin/dashboard", replace: true, state: {} });
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
