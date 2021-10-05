import _ from 'lodash';

const isNonArrayObject = (obj) => typeof obj === 'object' && !Array.isArray(obj);

const generateDiff = (data1, data2) => _.sortBy(_.union([...Object.keys(data1), ...Object.keys(data2)]))
  .map((key) => {
    const data1Value = data1[key];
    const data2Value = data2[key];
    if (!_.has(data1, key)) {
      return { key, type: 'added', newValue: data2Value };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', oldValue: data1Value };
    }
    if (isNonArrayObject(data1Value) && isNonArrayObject(data2Value)) {
      return { key, type: 'nested', newValue: generateDiff(data1Value, data2Value) };
    }
    if (!_.isEqual(data1Value, data2Value)) {
      return {
        key, type: 'changed', oldValue: data1Value, newValue: data2Value,
      };
    }
    return { key, type: 'none', newValue: data1Value };
  });

export default generateDiff;
