import fs from 'fs';

const getNthLine = (n, keys, json) => {
  if (n >= keys.length) {
    return null;
  }

  const key = keys[n];
  return `${key}: ${json[key]}`;
};

const mergeJSONs = (json1, json2) => {
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

const isJSONFilePath = (filePath) => filePath && filePath.endsWith('json');

const extractJSON = (filePath) => JSON.parse(fs.readFileSync(filePath).toString());

const genDiff = (filePath1, filePath2) => {
  if (!isJSONFilePath(filePath1) || !isJSONFilePath(filePath2)) {
    throw Error(`Expected both args to be .json files. Got ${filePath1}, ${filePath2}.`);
  }

  const json1 = extractJSON(filePath1);
  const json2 = extractJSON(filePath2);

  return mergeJSONs(json1, json2);
};

export default genDiff;
