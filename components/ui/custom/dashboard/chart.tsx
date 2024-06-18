import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['6/16', '6/17', '6/18', '6/19', '6/20', '6/21', '6/22', '6/23', '6/24', '6/25'],
    datasets: [
      {
        label: 'Points',
        data: [0, 100, 120, 150, 150, 100, 110, 120, 123, 138],
        fill: true,
        backgroundColor: (context:any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // This can happen if the chart is not yet fully initialized
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom); // Vertical gradient (top to bottom)
          gradient.addColorStop(0, 'rgba(75,192,192,0.3)');
          gradient.addColorStop(1, 'rgba(75,192,192,0)');
          return gradient;
        },
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: 'Points',
        font: {
          weight: 4000,
          size: 18,
        },
      },
    },
    scales: {
      x: {
        border:{dash: [4, 4]}, 
        grid: {
          display: true,
          color: 'rgba(128, 128, 128, 0.6)', // Gray color with transparency
          borderDash: [4, 4], // Makes the grid lines dashed
          drawBorder: false, // Prevent drawing the axis line between labels
          drawTicks: false, // Prevent drawing ticks on the axis
        },
        ticks: {
          padding: 20, // Adjust the padding here (in pixels)
        },
      },
      y: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

