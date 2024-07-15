import { IWRStatsResponse } from '@/types/IWrStatsResponse';
import {
  APIGatewayClient,
  GetRestApisCommand,
  GetRestApisCommandOutput,
  RestApi,
} from '@aws-sdk/client-api-gateway';
import { IWrProjectionData } from 'nfl-feed-types';
import 'server-only';
import aws4 from 'aws4';
import { RequestOptions } from 'https';

const region: string = 'us-east-1';
const revalidateCadence: number = 60 * 60 * 12; // 12 hours
const restApiPath: string = '/stats/getWrStats';
const service: string = 'execute-api';

const client: APIGatewayClient = new APIGatewayClient({
  region: region,
  credentials: {
    accessKeyId: process.env.GATEWAY_ACCESS_KEY_ID!,
    secretAccessKey: process.env.GATEWAY_SECRET_ACCESS_KEY!,
  },
});

const getAwsSignedHeaders = (host: string): HeadersInit => {
  const signedOptions: RequestOptions = aws4.sign(
    {
      service,
      region,
      path: restApiPath,
      headers: { host },
      method: 'GET',
      body: '',
    },
    {
      accessKeyId: process.env.GATEWAY_ACCESS_KEY_ID,
      secretAccessKey: process.env.GATEWAY_SECRET_ACCESS_KEY,
    },
  );

  const headers: HeadersInit = {};
  Object.assign(headers, signedOptions.headers);

  return headers;
};

interface IResponseData {
  [key: string]: string | undefined | IWrProjectionData[];
  lastUpdated: string | undefined;
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

    return `${api.id}.execute-api.us-east-1.amazonaws.com`;
  } catch (error) {
    console.error('Error fetching API Gateway URL:', error);
    throw error;
  }
};

export const fetchWrStats = async (): Promise<IWRStatsResponse> => {
  try {
    const host: string = await getApiGatewayUrl();
    const headers: HeadersInit = getAwsSignedHeaders(host);
    const response: Response = await fetch(`https://${host}/stats/getWrStats`, {
      method: 'GET',
      headers,
      next: { revalidate: revalidateCadence },
    });

    const data: IResponseData = await response.json();

    const wrStats: IWRStatsResponse = {
      stats: data.stats as IWrProjectionData[],
      lastUpdated: data.lastUpdated as string,
    };

    return wrStats;
  } catch (error) {
    console.error('Error in API route:', error);
    throw error;
  }
};
