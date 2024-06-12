import React, { useState, useEffect } from 'react';
import styles from '@/styles/FantasyChart.module.css';
import { Amplify } from 'aws-amplify';
import config from '../../amplifyconfiguration.json';
import { get } from '@aws-amplify/api';

Amplify.configure(config);

type GetOperation = IOperation<IRestApiResponse>;
type Headers = Record<string, string>;

/**
 * Type representing an operation that can be canceled.
 *
 * @internal
 */
interface IOperation<Response> {
  response: Promise<Response>;
  cancel(abortMessage?: string): void;
}

interface IResponsePayload {
  blob(): Promise<Blob>;
  text(): Promise<string>;
}

/**
 * Basic response type of REST API.
 *
 * @internal
 */
interface IRestApiResponse {
  body: IResponsePayload;
  statusCode: number;
  headers: Headers;
}

async function getWrStats(): Promise<IWRProjectionData[]> {
  try {
    const restOperation: GetOperation = get({
      apiName: 'stats-lambda-api-gateway',
      path: 'stats/getWrStats',
    });

    console.log(JSON.stringify(restOperation));

    const response: IRestApiResponse = await restOperation.response;

    console.log('GET call succeeded: ', response);
    const responseAsText: string = await response.body.text();
    return JSON.parse(responseAsText).stats as IWRProjectionData[];
  } catch (error) {
    console.log('GET call failed: ', error);
    throw error;
  }
}

export interface IWRProjectionData {
  name: string;
  projection: number;
  ml_guess: number;
}

export const FantasyChart: React.FC = () => {
  const [wrData, setWrData] = useState<IWRProjectionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: IWRProjectionData[] = await getWrStats();
        setWrData(data);
      } catch (error) {
        console.error('Error fetching WR stats:', error);
        throw error;
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
