import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import CompanyDonut from "../../components/charts/CompanyDonut";
// import MaterialTypeDonut from "../../components/charts/MaterialTypeDonut";
import { MaterialBarChart } from "../../components/charts/MaterialBarChart";
import FurnitureTable from "../../components/FurnitureTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/user/login?error=not-connected");
    }
  }, [loading, user, navigate]);

  return (
    <section className="bg-gray-200 p-10 grid grid-cols-3 gap-4">
      <MaterialBarChart />

      <CompanyDonut />

      {/* <MaterialTypeDonut /> */}

      <FurnitureTable />
    </section>
  );
}
