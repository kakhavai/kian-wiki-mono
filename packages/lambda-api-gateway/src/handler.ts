import { S3FileUtil, ConversionUtil } from 'common-utils';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Readable } from 'stream';
// import { TeamDataService } from 'nfl-feed-scraper';

// const teamDataService: TeamDataService = new TeamDataService();

const s3FileUtil: S3FileUtil = new S3FileUtil(process.env.AWS_REGION || '');
const bucketName: string = process.env.NFL_SCRAPE_BUCKET_NAME || '';

const wrDataFileName: string = 'wrStats.json';

export const mainHandler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', event);

  // await teamDataService.updateTeamRecords();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda API Gateway!' }),
  };
};

export const getWrStats = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', event);

  try {
    const dataStream: Readable = await s3FileUtil.downloadFile(
      bucketName,
      wrDataFileName,
    );
    const jsonData: JSON = await ConversionUtil.streamToJSON(dataStream);

    return {
      statusCode: 200,
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error fetching data from S3:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from S3' }),
    };
  }
};
