import parseData from './parsers.js';
import generateDiff from './generateDiff.js';
import readFile from './files.js';
import formatDiff from './formatters';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1Data = readFile(filePath1);
  const file2Data = readFile(filePath2);
  const object1 = parseData(file1Data);
  const object2 = parseData(file2Data);

  const diff = generateDiff(object1, object2);
  return formatDiff(format, diff);
};

export default genDiff;
