import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { data } from "../../pages/admin/dashboard";

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  return <Pie data={data} />;
}
