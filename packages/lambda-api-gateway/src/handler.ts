import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TeamDataService } from 'nfl-feed-scraper';

export const mainHandler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', event);

  await TeamDataService.updateTeamRecords();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda API Gateway!' }),
  };
};
