'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '@/styles/FantasyChart.module.css';
import { IWrProjectionData } from 'nfl-feed-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

ChartJS.defaults.color = 'white';
ChartJS.defaults.borderColor = 'white';
ChartJS.defaults.font.size = 12;

interface IFantasyChartProps {
  wrData: IWrProjectionData[];
}

export const FantasyChart: React.FC<IFantasyChartProps> = ({ wrData }) => {
  wrData = wrData.sort((a, b) => b.mlGuess - a.mlGuess);
  const labels: string[] = wrData.map((wrData) => wrData.name);
  const projections: number[] = wrData.map((wrData) => wrData.projection);
  const mlGuesses: number[] = wrData.map((wrData) => wrData.mlGuess);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Expert Projection',
        data: projections,
        backgroundColor: '#8884d8',
        datalabels: {
          anchor: 'end',
          align: 'left',
        },
      },
      {
        label: 'Machine Projection',
        data: mlGuesses,
        backgroundColor: 'rgba(0, 225, 255, 0.7)',
        hoverBackgroundColor: 'rgba(2, 100, 199, 0.7)',
        datalabels: {
          anchor: 'end',
          align: 'left',
        },
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 10 },
      },
      title: {
        display: true,
        text: 'Wide Receiver Projections PPR',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          lineWidth: 2,
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
