import React, { useState, useEffect } from 'react';
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

const revalidateCadence: number = 60 * 60 * 12; // 12 hours

const offlineData: IWrProjectionData[] = [
  { name: 'Puka Nacua', projection: 15, ml_guess: 14 },
  { name: 'Tyreek Hill', projection: 12, ml_guess: 18 },
  { name: 'Curtis Samuel', projection: 14, ml_guess: 20 },
  { name: 'Jaylen Waddle', projection: 10, ml_guess: 15 },
  { name: 'Keenan Allen', projection: 16, ml_guess: 22 },
  { name: 'Devante Adams', projection: 11, ml_guess: 17 },
  { name: 'Rashee Rice', projection: 13, ml_guess: 19 },
  { name: 'Deebo Samuel', projection: 9, ml_guess: 14 },
  { name: 'Justin Jefferson', projection: 17, ml_guess: 23 },
  { name: 'Jordan Addison', projection: 8, ml_guess: 12 },
  { name: 'D.K. Metcalf', projection: 18, ml_guess: 24 },
  { name: 'Brandon Aiyuk', projection: 7, ml_guess: 10 },
];

interface IWRStatsResponse {
  stats: IWrProjectionData[];
}

async function fetchWrStats(): Promise<IWrProjectionData[]> {
  try {
    const response: Response = await fetch(`/stats`, {
      next: { revalidate: revalidateCadence }, // Revalidate every 12 hours
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IWRStatsResponse = await response.json();
    return data.stats as IWrProjectionData[];
  } catch (error) {
    console.log('GET call failed: ', error);
    throw error;
  }
}

export const FantasyChart: React.FC = () => {
  const [wrData, setWrData] = useState<IWrProjectionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const data: IWrProjectionData[] = await fetchWrStats();
        setWrData(offlineData);
      } catch (error) {
        console.error('Error fetching WR stats:', error);
        setError('Server errored fetching fantasy data.');
      }
      setLoading(false);
    };

    fetchData().catch((reason) => {});
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const labels: string[] = wrData.map((data) => data.name);
  const projections: number[] = wrData.map((data) => data.projection);
  const mlGuesses: number[] = wrData.map((data) => data.ml_guess);

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Expert Projection',
        data: projections,
        backgroundColor: '#8884d8',
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: 'white',
        },
      },
      {
        label: 'ML Projection',
        data: mlGuesses,
        backgroundColor: 'rgba(0, 225, 255, 0.7)',
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: 'white',
        },
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    color: 'white',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Wide Receiver Projections',
        color: 'white',
      },

      datalabels: {
        color: 'white',
        font: {
          size: 10,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
