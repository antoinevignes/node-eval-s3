import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import PieChart from "../../components/charts/PieChart";

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/user/login?error=not-connected");
    }
  }, []);

  return (
    <section className="h-screen bg-gray-200 p-10">
      <div className="w-1/2 bg-white rounded-lg shadow-lg">
        <h4 className="p-5 text-center font-semibold text-xl bg-gray-100 rounded-lg">
          Meubles fabriqués
        </h4>

        <div className="flex flex-col justify-center items-center p-10">
          <PieChart />
        </div>
      </div>
    </section>
  );
}
