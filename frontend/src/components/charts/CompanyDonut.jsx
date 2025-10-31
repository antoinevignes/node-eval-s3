import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getRouteApi } from "@tanstack/react-router";

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
  const routeApi = getRouteApi("/admin/dashboard");
  const { companyData } = routeApi.useLoaderData();

  const stats = {
    labels: companyData.map((obj) => obj.name),
    datasets: [
      {
        label: "Matériaux",
        data: companyData.map((obj) => obj.totalMaterialsUsed),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  if (companyData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg flex justify-center items-center p-10">
        <span className="px-6 py-6 text-center text-gray-500 italic">
          Aucune donnée correspondante
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg flex justify-center items-center p-10">
      <Doughnut data={stats} options={options} />
    </div>
  );
}
