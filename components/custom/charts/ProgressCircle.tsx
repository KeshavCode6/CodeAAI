import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

interface ProgressCircleProps {
  value: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ value }) => {
  const doughnutData = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['#5592d9', 'rgba(85, 146, 217, 0.3)'],
        hoverBackgroundColor: ['#7eb8fc', 'rgba(192, 192, 192, 0.3)'],
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
        position: 'bottom' as 'bottom',
      },
    },
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};


interface ProgressionChartWithTextProps {
  title: string;
  value: number;
  className?:any;
}

export function ProgressCircleWithText({
  title,
  value,
  className,
}: ProgressionChartWithTextProps) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-center">
        <span className="text-md">{title}</span>
        <span className="text-md text-slate-400">{value}%</span>
      </div>
      <ProgressCircle value={value} />
    </div>
  );
}


interface DifficultyCircleChartProps {
  values: number[];
  labels: string[];
}

export const DifficultyCircle: React.FC<DifficultyCircleChartProps> = ({ values, labels }) => {
  const doughnutData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#2E8B57', '#D2691E', '#B22222'],
        hoverBackgroundColor: ['#7eb8fc', 'rgba(192, 192, 192, 0.3)'],
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
        enabled: true,
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
        position: 'bottom' as 'bottom',
      },
    },
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

interface MultipleSectionsCircleWithTextProps {
  labels: string[];
  title?:string;
  values: number[];
  className?:any;
}

export function MultipleSectionsCircleWithText({
  labels,
  values,
  title,
  className,
}: MultipleSectionsCircleWithTextProps) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-center">
        <span className="text-md">{title}</span>
      </div>
      <DifficultyCircle values={values} labels={labels} />
    </div>
  );
}