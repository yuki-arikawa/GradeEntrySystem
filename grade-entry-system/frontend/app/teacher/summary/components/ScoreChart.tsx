import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// Chart.jsの登録
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

type ScoreChartProps = {
  labels: string[]; // X軸のラベル（点数）
  dataPoints: number[]; // Y軸のデータ（人数）
  minScore?: number;
  maxScore?: number;
};

export default function ScoreChart({ labels, dataPoints, minScore = 0, maxScore = 80 }: ScoreChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "点数の分布",
        data: dataPoints,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "特定日付の点数分布",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "点数",
        },
        min: minScore,
        max: maxScore,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "人数",
        },
      },
    },
  };

  return (
    <div className="w-full h-auto">
      <Bar data={data} options={options} />
    </div>
  );
}
