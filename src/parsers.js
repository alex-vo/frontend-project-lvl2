import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const extractFileData = (filePath) => fs.readFileSync(filePath).toString();

const extractObject = ({ rawData, extension, filePath }) => {
  switch (extension) {
    case '.json':
      return JSON.parse(rawData);
    case '.yml':
    case '.yaml':
      return yaml.load(rawData);
    default:
      throw Error(`Unsupported extension '${extension}' for file '${filePath}'.`);
  }
};

const parseFiles = (...filePaths) => filePaths
  .map((filePath) => ({
    filePath,
    rawData: extractFileData(filePath),
    extension: path.extname(filePath),
  }))
  .map((file) => extractObject(file));

export default parseFiles;
