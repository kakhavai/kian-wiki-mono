import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
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

    console.log('Here');

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

  public async listFiles(
    bucketName: string,
    prefix: string = '',
    maxKeys: number = 1000,
  ): Promise<ListObjectsV2CommandOutput> {
    const listParams: ListObjectsV2CommandInput = {
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: maxKeys,
    };

    const command: ListObjectsV2Command = new ListObjectsV2Command(listParams);
    const response: ListObjectsV2CommandOutput =
      await this._s3Client.send(command);

    return response;
  }
}
