import { NextRequest, NextResponse } from 'next/server';
import {
  APIGatewayClient,
  GetRestApisCommand,
  GetRestApisCommandOutput,
  RestApi,
} from '@aws-sdk/client-api-gateway';

const client: APIGatewayClient = new APIGatewayClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.API_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.API_SECRET_ACCESS_KEY || '',
  },
});

interface IResponseData {
  // Define the structure of the response data from your API here
  [key: string]: string | undefined;
  lastUpdateTime: string | undefined;
}

function fetchTime(): string {
  const now: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Los_Angeles', // PST time zone
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return now.toLocaleString('en-US', options) + ` PST`;
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

export async function GET(req: NextRequest): Promise<void | Response> {
  try {
    const apiUrl: string = await getApiGatewayUrl();
    const response: Response = await fetch(`${apiUrl}/getWrStats`);
    const data: IResponseData = await response.json();
    data.lastUpdateTime = await fetchTime();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
