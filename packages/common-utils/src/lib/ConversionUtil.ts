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
}
