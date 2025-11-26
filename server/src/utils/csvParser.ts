import { parse } from "csv-parse";

export const parseCSV = (buffer: Buffer): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    parse(
      buffer.toString(),
      {
        columns: true,
        trim: true,
        skip_empty_lines: true,
        relax_column_count: true,
      },
      (err, records) => {
        if (err) reject(err);
        else resolve(records);
      }
    );
  });
};
