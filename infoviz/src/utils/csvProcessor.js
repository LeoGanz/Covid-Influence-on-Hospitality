import fs from "fs";
import { parse } from 'csv-parse';
import { finished } from 'stream/promises';

// Adapted from https://csv.js.org/parse/recipes/promises/
export const parseCsv = async (csvFilePath) => {
    const records = [];
    const parser = fs
        .createReadStream(csvFilePath)
        .pipe(parse({
            columns: true,
            delimiter: ',',
        }));
    parser.on('readable', function(){
        let record; while ((record = parser.read()) !== null) {
            // Work with each record
            records.push(record);
        }
    });
    await finished(parser);
    return records;
};