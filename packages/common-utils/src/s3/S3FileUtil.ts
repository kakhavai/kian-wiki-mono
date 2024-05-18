import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export class S3FileUtil {
  private _s3Client: S3Client;

  public constructor(region: string) {
    this._s3Client = new S3Client({ region });
  }

  public async uploadFile(
    bucketName: string,
    key: string,
    body: Buffer | Uint8Array | Blob | string | Readable,
  ): Promise<void> {
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
      Body: body,
    };

    const command: PutObjectCommand = new PutObjectCommand(uploadParams);
    await this._s3Client.send(command);
  }

  public async downloadFile(
    bucketName: string,
    key: string,
  ): Promise<Readable> {
    const downloadParams: GetObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };

    const command: GetObjectCommand = new GetObjectCommand(downloadParams);
    const response: GetObjectCommandOutput = await this._s3Client.send(command);

    if (response.Body instanceof Readable) {
      return response.Body;
    } else {
      throw new Error('Expected a readable stream for file download.');
    }
  }

  public async deleteFile(bucketName: string, key: string): Promise<void> {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };

    const command: DeleteObjectCommand = new DeleteObjectCommand(deleteParams);
    await this._s3Client.send(command);
  }
}

// Export the class for use in other parts of the monorepo
export default S3FileUtil;
