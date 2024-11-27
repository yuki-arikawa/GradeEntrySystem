import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// Chart.jsの登録
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

type ScoreChartProps = {
  labels: string[]; // X軸のラベル（テストの日付）
  dataPoints: number[]; // Y軸のデータ（点数）
};

export default function ScoreChart({ labels, dataPoints }: ScoreChartProps) {
  const maxScore = 80;
  const threshold = maxScore * 0.6;

  const data = {
    labels,
    datasets: [
      {
        label: '各テストの点数',
        data: dataPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'テストごとの点数比較',
      },
      annotation: {
        annotations: {
          line: {
            type: 'box',
            yMin: threshold,
            yMax: threshold,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: true,
              content: '60%',
              position: 'end',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: 'red',
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 80,
        title: {
          display: true,
          text: '点数',
        },
      },
      x: {
        title: {
          display: true,
          text: '日付',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
