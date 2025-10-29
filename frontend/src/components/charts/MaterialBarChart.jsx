import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../context/AuthContext";

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
  const API_URL = import.meta.env.VITE_API_URL;
  const { user, loading } = useContext(AuthContext);

  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  const stats = {
    labels,
    datasets: [
      {
        label: "Matériaux",
        data: dataset,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (loading || !user) return;

    async function getByCompany() {
      try {
        const response = await fetch(`${API_URL}/stats/by-material`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        const raw = await response.text();
        if (!response.ok) {
          console.error("Erreur", raw);
          return;
        }

        const data = JSON.parse(raw);

        const labels = data.map((obj) => obj.name);
        const dataset = data.map((obj) => obj.totalUsed);

        setLabels(labels);
        setDataset(dataset);
      } catch (err) {
        console.error(err);
      }
    }

    getByCompany();
  }, [loading, user, API_URL]);

  return (
    <div className="bg-white rounded-lg shadow-lg col-span-2 p-10">
      <Bar options={options} data={stats} />
    </div>
  );
}
