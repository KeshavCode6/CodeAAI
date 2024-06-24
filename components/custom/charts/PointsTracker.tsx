import React from "react";
import { Line } from "react-chartjs-2";
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
} from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PointsTrackerProps {
  className?: string;
  pointData: any;
}
const PointsTracker = ({ className, pointData }: PointsTrackerProps) => {
  // making sure point data is defined
  let labels:string[] = [];
  let values:any[] = []
  let fallBack = (<p className="absolute top-1/2 left-0 right-0 text-sm text-slate-500 text-center">Solve a challenge to show chart..</p>)
  if (pointData !== undefined && Object.keys(pointData).length != 0) {
    let totalKeys = Object.keys(pointData);
    if (!pointData || totalKeys.length === 0) {
      return fallBack
    }

    // Get the last ten keys from
    let keys: string[] = [];
    if (totalKeys.length <= 7) {
      keys = totalKeys;
    } else if (totalKeys.length % 7 !== 0) {
      let numsOfTimesIn = Math.floor(totalKeys.length / 7);
      let n = totalKeys.length - numsOfTimesIn * 7;

      keys = Object.keys(pointData).slice(-n);
    } else {
      keys = Object.keys(pointData).slice(-7);
    }

    // returning labels in m/d format
    labels = keys.map((label) => {
      let parts = label.split("/");
      let month = parseInt(parts[0]).toString();
      let day = parts[1];
      return `${month}/${day}`;
    });

    // date values in integer form
    let dayMonth = 0;
    let dayNumber = 0;
    let dayYear = 0;
    // getting the last day with data in raw format
    let lastDay = Object.keys(pointData)[Object.keys(pointData).length - 1];
    try {
      // Getting day, month, and year by splitting string at the slash of the last day
      let dateParts = lastDay.split("/");
      dayMonth = parseInt(dateParts[0]);
      dayNumber = parseInt(dateParts[1]);
      dayYear = parseInt(dateParts[2]);
    } catch {
      console.log("Failed to parse string as integer in Points Tracker");
      return;
    }

    // calculating how many extra days to add
    let daysWithData = labels.length;
    let emptyDays = 7 - daysWithData;

    // adding labels
    for (let x = 0; x < emptyDays; x++) {
      dayNumber += 1;

      // making sure date is valid
      let daysInMonth = new Date(dayYear, dayMonth, 0).getDate(); // Correct placement of `daysInMonth`
      if (dayNumber > daysInMonth) {
        dayNumber = 1;
        dayMonth += 1;

        if (dayMonth > 12) {
          dayYear += 1;
          dayMonth = 1;
        }
      }

      labels.push(`${dayMonth}/${dayNumber}`);
    }

    keys.forEach(element => {
      values.push(pointData[element])
    });
  }
  else{
    return fallBack
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: values,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // This can happen if the chart is not yet fully initialized
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          ); // Vertical gradient (top to bottom)
          gradient.addColorStop(0, "#5592d9");
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          return gradient;
        },
        borderColor: "#5592d9",
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
        font: {
          weight: 4000,
          size: 18,
        },
      },
    },
    scales: {
      x: {
        border: { dash: [4, 4] },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.4)", // Gray color with transparency
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

  return <Line data={data} options={options} className={className} />;
};

export default PointsTracker;
