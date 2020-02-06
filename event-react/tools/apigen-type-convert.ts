import fs from 'fs';

const TYPE_FILE_PATH = process.argv[2];

const type_file_str = fs.readFileSync(TYPE_FILE_PATH, { encoding: 'utf-8' });
fs.writeFileSync(TYPE_FILE_PATH, `type CrTimestamp = number;
type CrJson = any;
type Upload = null;
${type_file_str}`, { encoding: 'utf-8' });
