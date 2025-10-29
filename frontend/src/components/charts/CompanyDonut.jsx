import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useStats } from "../../context/StatsContext";

Chart.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Matériaux par entreprise",
    },
  },
};

export default function CompanyDonut() {
  const { companyStats, isRefreshing } = useStats();

  const stats = {
    labels: companyStats.map((obj) => obj.name),
    datasets: [
      {
        label: "Matériaux",
        data: companyStats.map((obj) => obj.totalMaterialsUsed),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex justify-center items-center p-10">
      {isRefreshing ? (
        <p className="text-gray-500 italic">Mise à jour...</p>
      ) : (
        <Doughnut data={stats} />
      )}
    </div>
  );
}
