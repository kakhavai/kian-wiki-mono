import { S3FileUtil } from '../../s3/S3FileUtil';

describe('S3FileUtil Integration Tests', () => {
  const region = 'us-east-1';
  const bucketName = process.env.NFL_SCRAPE_BUCKET_NAME as string; // Replace with your actual test bucket name
  const s3FileUtil = new S3FileUtil(region);

  test('should upload a file to S3', async () => {
    const key = 'test-upload-file.txt';
    const body = 'Hello, world!';

    await s3FileUtil.uploadFile(bucketName, key, body);

    // Check if the file exists in the bucket
    const downloadedFile = await s3FileUtil.downloadFile(bucketName, key);
    let downloadedContent = '';
    downloadedFile.on('data', (chunk) => {
      downloadedContent += chunk.toString();
    });

    // Wait for the stream to finish
    await new Promise<void>((resolve, reject) => {
      downloadedFile.on('end', () => resolve());
      downloadedFile.on('error', reject);
    });

    expect(downloadedContent).toBe(body);
  });

  test('should download a file from S3', async () => {
    const key = 'test-download-file.txt';
    const body = 'Hello, download test!';

    // First, upload the file
    await s3FileUtil.uploadFile(bucketName, key, body);

    // Then, download the file
    const downloadedFile = await s3FileUtil.downloadFile(bucketName, key);
    let downloadedContent = '';
    downloadedFile.on('data', (chunk) => {
      downloadedContent += chunk.toString();
    });

    // Wait for the stream to finish
    await new Promise<void>((resolve, reject) => {
      downloadedFile.on('end', () => resolve());
      downloadedFile.on('error', reject);
    });

    expect(downloadedContent).toBe(body);
  });

  test('should delete a file from S3', async () => {
    const key = 'test-delete-file.txt';
    const body = 'Hello, delete test!';

    // First, upload the file
    await s3FileUtil.uploadFile(bucketName, key, body);

    // Then, delete the file
    await s3FileUtil.deleteFile(bucketName, key);

    // Check if the file is deleted
    await expect(s3FileUtil.downloadFile(bucketName, key)).rejects.toThrow();
  });

  afterAll(async () => {
    // Clean up: delete the test files from the bucket
    const deleteFiles = async (keys: string[]): Promise<void> => {
      for (const key of keys) {
        await s3FileUtil.deleteFile(bucketName, key);
      }
    };

    await deleteFiles([
      'test-upload-file.txt',
      'test-download-file.txt',
      'test-delete-file.txt',
    ]);
  });
});
