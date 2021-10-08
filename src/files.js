import fs from 'fs';
import path from 'path';

const extractFileData = (filePath) => fs.readFileSync(filePath, { encoding: 'utf-8' });

const getType = (filePath) => {
  const fullExtension = path.extname(filePath);
  if (!fullExtension) {
    return fullExtension;
  }

  return fullExtension.substr(1, fullExtension.length - 1);
};

const readFile = (filePath) => ({
  rawData: extractFileData(filePath),
  type: getType(filePath),
});

export default readFile;
