declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}

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
  TooltipPositionerFunction,
  ChartType,
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

const revalidateCadence: number = 60 * 60 * 12; // 12 hours

const offlineData: IWrProjectionData[] = [
  { name: 'Puka Nacua', projection: 14, mlGuess: 20 },
  { name: 'Tyreek Hill', projection: 21, mlGuess: 18 },
  { name: 'Curtis Samuel', projection: 18, mlGuess: 25 },
  { name: 'Jaylen Waddle', projection: 15, mlGuess: 12 },
  { name: 'Keenan Allen', projection: 22, mlGuess: 27 },
  { name: 'Devante Adams', projection: 17, mlGuess: 24 },
  { name: 'Rashee Rice', projection: 12, mlGuess: 15 },
  { name: 'Deebo Samuel', projection: 10, mlGuess: 14 },
  { name: 'Justin Jefferson', projection: 25, mlGuess: 28 },
  { name: 'Jordan Addison', projection: 9, mlGuess: 13 },
  { name: 'D.K. Metcalf', projection: 19, mlGuess: 23 },
  { name: 'Brandon Aiyuk', projection: 11, mlGuess: 17 },
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
    return data.stats.sort(
      (a, b) => b.mlGuess - a.mlGuess,
    ) as IWrProjectionData[];
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
        setWrData(offlineData.sort((a, b) => b.mlGuess - a.mlGuess));
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
  const mlGuesses: number[] = wrData.map((data) => data.mlGuess);

  const data: ChartData<'bar'> = {
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

  // Tooltip.positioners.myCustomPositioner = function (
  //   elements: readonly ActiveElement[],
  //   eventPosition: Point,
  // ) {
  //   if (!elements.length) {
  //     return false; // Return false to use the default positioner if there are no elements
  //   }
  //   // A reference to the tooltip model
  //   const chart: ChartJS = this.chart;

  //   /* ... */

  //   const position: number = elements[0].element.y;
  //   console.log(chart.width);
  //   return {
  //     x: 700,
  //     y: 0,
  //   };
  // };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // tooltip: {
      //   position: 'myCustomPositioner',
      //   animation: {
      //     duration: 0,
      //   },
      // },
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
