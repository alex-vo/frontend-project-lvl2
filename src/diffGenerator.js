import _ from 'lodash';

const isNonArrayObject = (obj) => typeof obj === 'object' && !Array.isArray(obj);

const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1).sort();
  const keys2 = Object.keys(data2).sort();
  const result = {};
  for (let i = 0, j = 0; i < keys1.length || j < keys2.length;) {
    const data1Key = keys1[i];
    const data1Value = data1[data1Key];
    const data2Key = keys2[j];
    const data2Value = data2[data2Key];
    if (i >= keys1.length || data1Key > data2Key) {
      result[data2Key] = { type: 'added', newValue: data2Value };
      j += 1;
    } else if (j >= keys2.length || data1Key < data2Key) {
      result[data1Key] = { type: 'removed', oldValue: data1Value };
      i += 1;
    } else {
      if (isNonArrayObject(data1Value) && isNonArrayObject(data2Value)) {
        result[data1Key] = { type: 'none', newValue: generateDiff(data1Value, data2Value) };
      } else if (!_.isEqual(data1Value, data2Value)) {
        result[data1Key] = { type: 'changed', oldValue: data1Value, newValue: data2Value };
      } else {
        result[data1Key] = { type: 'none', newValue: data1Value };
      }
      i += 1;
      j += 1;
    }
  }

  return result;
};

export default generateDiff;
