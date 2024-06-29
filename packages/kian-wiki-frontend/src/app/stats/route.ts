// app/stats/route.ts

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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const getApiGatewayUrl = async (): Promise<string> => {
  try {
    const command: GetRestApisCommand = new GetRestApisCommand({});
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
    console.log(process.env.AWS_ACCESS_KEY_ID);
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
    console.log(apiUrl);
    const response: Response = await fetch(`${apiUrl}/getWrStats`);
    console.log(JSON.stringify(response));
    const data: string = await response.json();
    console.log(JSON.stringify(data));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
