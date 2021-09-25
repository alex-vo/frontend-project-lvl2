import parseFiles from './parsers.js';

const getNthLine = (n, keys, json) => {
  if (n >= keys.length) {
    return null;
  }

  const key = keys[n];
  return `${key}: ${json[key]}`;
};

const mergeObjects = (json1, json2) => {
  const keys1 = Object.keys(json1).sort();
  const keys2 = Object.keys(json2).sort();
  const result = ['{'];
  for (let i = 0, j = 0; i < keys1.length || j < keys2.length;) {
    const file1String = getNthLine(i, keys1, json1);
    const file2String = getNthLine(j, keys2, json2);
    let resultingString;
    if (!file1String || file1String > file2String) {
      resultingString = `  + ${file2String}`;
      j += 1;
    } else if (!file2String || file1String < file2String) {
      resultingString = `  - ${file1String}`;
      i += 1;
    } else {
      resultingString = `    ${file1String}`;
      i += 1;
      j += 1;
    }
    result.push(resultingString);
  }
  result.push('}');

  return result.join('\n');
};

const genDiff = (filePath1, filePath2) => {
  const [object1, object2] = parseFiles(filePath1, filePath2);

  return mergeObjects(object1, object2);
};

export default genDiff;
