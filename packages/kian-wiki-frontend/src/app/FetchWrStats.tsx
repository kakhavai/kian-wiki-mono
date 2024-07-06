// src/utils/FetchWrStats.ts

import {
  APIGatewayClient,
  GetRestApisCommand,
  GetRestApisCommandOutput,
  RestApi,
} from '@aws-sdk/client-api-gateway';
import { IWrProjectionData } from 'nfl-feed-types';
import 'server-only';

const revalidateCadence: number = 60 * 60 * 12; // 12 hours
const client: APIGatewayClient = new APIGatewayClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.API_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.API_SECRET_ACCESS_KEY || '',
  },
});

interface IWRStatsResponse {
  stats: IWrProjectionData[];
  lastUpdateTime: string;
}

interface IResponseData {
  [key: string]: string | undefined | IWrProjectionData[];
  lastUpdateTime: string | undefined;
}

const getApiGatewayUrl = async (): Promise<string> => {
  try {
    const command: GetRestApisCommand = new GetRestApisCommand({});
    const response: GetRestApisCommandOutput = await client.send(command);

    const api: RestApi | undefined = response.items?.find(
      (api) => api.name === 'stats-lambda-api-gateway',
    );
    if (!api) {
      throw new Error('API Gateway not found');
    }
    return `https://${api.id}.execute-api.us-east-1.amazonaws.com/stats`;
  } catch (error) {
    console.error('Error fetching API Gateway URL:', error);
    throw error;
  }
};

export const fetchWrStats = async (): Promise<IWrProjectionData[]> => {
  try {
    const apiUrl: string = await getApiGatewayUrl();
    const response: Response = await fetch(`${apiUrl}/getWrStats`, {
      next: { revalidate: revalidateCadence }, // Revalidate every 12 hours
    });

    const data: IResponseData = await response.json();

    const wrStats: IWRStatsResponse = {
      stats: data.stats as IWrProjectionData[],
      lastUpdateTime: new Date().toISOString(),
    };

    return wrStats.stats;
  } catch (error) {
    console.error('Error in API route:', error);
    throw error;
  }
};
