import parseFiles from './parsers.js';
import generateDiff from './diffGenerator.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw Error(`Unrecognized format ${format}.`);
  }
};

const genDiff = (filePath1, filePath2, format) => {
  const [object1, object2] = parseFiles(filePath1, filePath2);

  const diff = generateDiff(object1, object2);
  return getFormatter(format)(diff);
};

export default genDiff;
