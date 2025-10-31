import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getRouteApi } from "@tanstack/react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Matériaux utilisés",
    },
  },
};

export function MaterialBarChart() {
  const routeApi = getRouteApi("/admin/dashboard");
  const { materialData } = routeApi.useLoaderData();

  const stats = {
    labels: materialData.map((obj) => obj.name),
    datasets: [
      {
        label: "Matériaux",
        data: materialData.map((obj) => obj.totalUsed),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (materialData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg flex justify-center items-center p-10 col-span-2">
        <span className="px-6 py-6 text-center text-gray-500 italic">
          Aucune donnée correspondante
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg col-span-2 p-10">
      <Bar options={options} data={stats} />
    </div>
  );
}
