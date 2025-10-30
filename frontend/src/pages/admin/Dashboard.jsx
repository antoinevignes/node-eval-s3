import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router";
import CompanyDonut from "../../components/charts/CompanyDonut";
import { MaterialBarChart } from "../../components/charts/MaterialBarChart";
import FurnitureTable from "../../components/FurnitureTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");

  useEffect(() => {
    if (!user && !loading) {
      navigate("/user/login", { state: { error: true } });
    }
  }, [loading, user, navigate]);

  return (
    <section className="p-10 grid grid-cols-3 gap-4">
      <MaterialBarChart />

      <CompanyDonut />

      <FurnitureTable />

      {success && (
        <div
          className="
            bg-green-300 border border-green-500 
            w-fit p-5 rounded-lg absolute bottom-10 right-10
            shadow-lg text-green-900 font-medium
            animate-slide-fade
          "
        >
          <p>Meuble ajouté avec succès !</p>
        </div>
      )}
    </section>
  );
}
