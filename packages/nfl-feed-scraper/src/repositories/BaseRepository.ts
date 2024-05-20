import { prisma } from '../prisma/PrismaSingleton';
import { IDbEntity } from 'common-types';

export class BaseRepository<T extends IDbEntity> {
  private _tableName: string;
  private _uniqueKey: string;
  private _fields: Array<string>;

  public constructor(
    tableName: string,
    uniqueKey: string,
    fields: Array<string>,
  ) {
    this._tableName = tableName;
    this._uniqueKey = uniqueKey;
    this._fields = fields;
  }

  private _toDatabaseValueString(item: T): string {
    const values: string = this._fields
      .map((field) => {
        const key: string | number = field;
        const value: string | number | boolean | Date = item[key];
        if (typeof value === 'string') {
          return `'${value.replace(/'/g, "''")}'`;
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          return `${value}`;
        } else if (value instanceof Date) {
          if (isNaN(value.getTime())) {
            return `'${new Date().toISOString()}'`;
          }
          return `'${value.toISOString()}'`;
        } else {
          // Optionally handle or throw an error for unsupported types
          throw new Error('Unsupported type for SQL generation');
        }
      })
      .join(', ');

    return `(${values})`;
  }

  private _columns(): string {
    return `(${this._fields.map((field) => `"${String(field)}"`).join(', ')})`;
  }

  private _updateSet(): string {
    return this._fields
      .map((field) => `"${String(field)}" = EXCLUDED."${String(field)}"`)
      .join(', ');
  }

  private _generateDatabaseValueList(data: Array<T>): string {
    return data
      .map((item) => `${this._toDatabaseValueString(item)}`)
      .join(', ');
  }
  public async bulkUpsert(data: Array<T>): Promise<boolean> {
    if (data.length === 0) return true;

    const values: string = this._generateDatabaseValueList(data);

    const query: string = `
        INSERT INTO "${this._tableName}" ${this._columns()}
        VALUES ${values}
        ON CONFLICT ("${this._uniqueKey}") DO UPDATE SET
          ${this._updateSet()};
      `;

    try {
      await prisma.$executeRawUnsafe(query);
      return true;
    } catch (error) {
      console.error(
        `${this._tableName} Repository: Error inserting/updating data:`,
        error,
        query,
      );
      throw error;
    }
  }

  public async bulkDeleteMissing(data: Array<T>): Promise<boolean> {
    if (data.length === 0) return true;

    const values: string = this._generateDatabaseValueList(data);

    const query: string = `
        WITH retained_data ${this._columns()} AS (VALUES ${values})
        DELETE FROM "${this._tableName}"
        WHERE NOT EXISTS (
          SELECT 1 FROM retained_data WHERE retained_data."${
            this._uniqueKey
          }" = "${this._tableName}"."${this._uniqueKey}"
        );
      `;

    try {
      await prisma.$executeRawUnsafe(query);
      return true;
    } catch (error) {
      console.error(
        `${this._tableName} Repository: Error deleting data:`,
        error,
        query,
      );

      throw error;
    }
  }
}
