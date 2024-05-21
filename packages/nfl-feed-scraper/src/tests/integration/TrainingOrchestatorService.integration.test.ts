import { TrainingOrchestratorService } from '../../services/training-generation/TrainingOrchestratorService';
import { S3FileUtil } from 'common-utils';
jest.setTimeout(60000 * 4); // 60 seconds

describe('TrainingOrchestratorService Integration Test', () => {
  let trainingOrchestratorService: TrainingOrchestratorService;
  let playerId: string;

  beforeAll(() => {
    // Initialize the service with any necessary configuration
    trainingOrchestratorService = new TrainingOrchestratorService();
    playerId = '4426515';
  });

  test('should generate training data and upload to S3', async () => {
    // Call the method
    await trainingOrchestratorService.generateTrainingData(playerId);

    // Verify the file was uploaded to S3
    const s3FileUtil = new S3FileUtil(
      process.env.NFL_SCRAPE_BUCKET_REGION || '',
    );
    const uploadedData = await s3FileUtil.downloadFile(
      process.env.NFL_SCRAPE_BUCKET_NAME || '',
      `${playerId}.wr.trainingdata`,
    );

    let downloadedContent = '';
    uploadedData.on('data', (chunk) => {
      downloadedContent += chunk.toString();
    });

    // Wait for the stream to finish
    await new Promise<void>((resolve, reject) => {
      uploadedData.on('end', () => resolve());
      uploadedData.on('error', reject);
    });

    console.log(JSON.stringify(downloadedContent.toString()));

    // Parse and check the uploaded data
    const wrResult = JSON.parse(downloadedContent.toString());

    console.log(JSON.stringify(wrResult));

    // Add your assertions here based on your expectations
    expect(wrResult).toBeInstanceOf(Array);
    expect(wrResult.length).toBeGreaterThan(0);
  });
});
