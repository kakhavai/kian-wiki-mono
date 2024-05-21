import { Readable } from 'stream';

export class ConversionUtil {
  // Utility function to convert enum values to strings
  public static convertEnumValuesToString(enumObject: {
    [key: string]: string | number;
  }): {
    [key: string]: string;
  } {
    const result: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(enumObject)) {
      result[key] = String(value);
    }
    return result;
  }

  public static async streamToJSON(stream: Readable): Promise<JSON> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer: Buffer = Buffer.concat(chunks);
    const jsonString: string = buffer.toString('utf-8');
    return JSON.parse(jsonString);
  }
}
