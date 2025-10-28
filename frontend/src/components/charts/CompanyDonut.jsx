import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  const API_URL = import.meta.env.VITE_API_URL;
  const { user, loading } = useContext(AuthContext);

  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  const stats = {
    labels: labels,
    datasets: [
      {
        label: "Matériaux",
        data: dataset,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  useEffect(() => {
    if (loading || !user) return;

    async function getByCompany() {
      try {
        const response = await fetch(`${API_URL}/stats/by-company`, {
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
        const dataset = data.map((obj) => obj.totalMaterialsUsed);

        setLabels(labels);
        setDataset(dataset);
      } catch (err) {
        console.error(err);
      }
    }

    getByCompany();
  }, [loading, user, API_URL]);

  return (
    <div className="bg-white rounded-lg shadow-lg flex justify-center items-center p-10">
      <Doughnut options={options} data={stats} />
    </div>
  );
}
