import React, { useState, useEffect } from 'react';
import styles from '@/styles/FantasyChart.module.css';
// AWS SDK Configuration

export interface IWRProjectionData {
  name: string;
  projection: number;
  ml_guess: number;
}

export interface IWRStatsResponse {
  stats: IWRProjectionData[];
}

async function fetchWrStats(): Promise<IWRProjectionData[]> {
  try {
    const response: Response = await fetch(`/stats`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IWRStatsResponse = await response.json();
    return data.stats as IWRProjectionData[];
  } catch (error) {
    console.log('GET call failed: ', error);
    throw error;
  }
}

export const FantasyChart: React.FC = () => {
  const [wrData, setWrData] = useState<IWRProjectionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: IWRProjectionData[] = await fetchWrStats();
        setWrData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching WR stats:', error);
        setLoading(false);
      }
    };

    fetchData().then(
      () => {
        console.log('success'); // Success!
        setLoading(false);
      },
      (reason) => {
        console.error(reason); // Error!
      },
    );
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Wide Receiver Projections</h2>
      <div className={styles.chart}>
        <div className={styles.chartKey}>
          <div className={styles.keyItem}>
            <span className={`${styles.keyColor} ${styles.expert}`}></span>
            <span>Expert Projection</span>
          </div>
          <div className={styles.keyItem}>
            <span className={`${styles.keyColor} ${styles.ml}`}></span>
            <span>ML Projection</span>
          </div>
        </div>
        {wrData.map((data, index) => (
          <div className={styles.chartBar} key={index}>
            <div className={styles.chartBarContent}>
              <div
                className={`${styles.chartBarInner} ${styles.expert}`}
                style={{ width: `${data.projection * 10}px` }}
              >
                <span className={styles.chartBarLabel}>{data.projection}</span>
              </div>
              <div
                className={`${styles.chartBarInner} ${styles.ml}`}
                style={{ width: `${data.ml_guess * 10}px` }}
              >
                <span className={styles.chartBarLabel}>{data.ml_guess}</span>
              </div>
            </div>
            <span className={styles.chartBarName}>{data.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
