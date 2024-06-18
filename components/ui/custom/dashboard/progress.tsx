// DoughnutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

interface DoughnutChartProps {
  value: number;
  label: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ value, label }) => {
  const doughnutData = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['rgba(0, 192, 192, 1)', 'rgba(192, 192, 192, 0.3)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 192, 192, 0.3)'],
        borderWidth:1,
        borderColor:"black", 
        borderRadius: 30
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '80%',
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: label,
        position: 'bottom' as 'bottom',
      },
    },
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

export default DoughnutChart;
