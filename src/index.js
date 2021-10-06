import parseData from './parsers.js';
import generateDiff from './diffGenerator.js';
import readFiles from './files.js';
import getFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  // todo which option is better?
  const [object1, object2] = readFiles([filePath1, filePath2])
    .map((fileData) => parseData(fileData));
  // const [file1Data, file2Data] = readFiles([filePath1, filePath2]);
  // const object1 = parseData(file1Data);
  // const object2 = parseData(file2Data);

  const diff = generateDiff(object1, object2);
  return getFormatter(format)(diff);
};

export default genDiff;
