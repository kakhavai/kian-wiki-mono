import React from 'react';
import styles from '@/styles/FantasyChart.module.css';

export interface IWRProjectionData {
  name: string;
  projection: number;
  ml_guess: number;
}

const wrData: IWRProjectionData[] = [
  { name: 'Puka Nacua', projection: 15, ml_guess: 21 },
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

export const FantasyChart: React.FC = () => {
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
