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
      j++;
    } else if (!file2String || file1String < file2String) {
      resultingString = `  - ${file1String}`;
      i++;
    } else {
      resultingString = `    ${file1String}`;
      i++;
      j++;
    }
    result.push(resultingString);
  }
  result.push('}');

  return result.join('\n');
}

const genDiff = (filePath1, filePath2) => {
  //todo throw error if not json
  const json1 = JSON.parse(fs.readFileSync(filePath1).toString());
  const json2 = JSON.parse(fs.readFileSync(filePath2).toString());

  return mergeJSONs(json1, json2);
};

export default genDiff;