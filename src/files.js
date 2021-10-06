import fs from 'fs';
import path from 'path';

const extractFileData = (filePath) => fs.readFileSync(filePath, { encoding: 'utf-8' });

const getExtension = (filePath) => {
  const fullExtension = path.extname(filePath);
  if (!fullExtension) {
    return fullExtension;
  }

  return fullExtension.substr(1, fullExtension.length - 1);
};

const readFiles = (filePaths) => filePaths
  .map((filePath) => ({
    rawData: extractFileData(filePath),
    extension: getExtension(filePath),
  }));

export default readFiles;
