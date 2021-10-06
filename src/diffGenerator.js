import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const uniqueKeys = _.union(Object.keys(data1), Object.keys(data2));
  const uniqueSortedKeys = _.sortBy(uniqueKeys);
  return uniqueSortedKeys
    .map((key) => {
      const data1Value = data1[key];
      const data2Value = data2[key];
      if (!_.has(data1, key)) {
        return { key, type: 'added', value: data2Value };
      }
      if (!_.has(data2, key)) {
        return { key, type: 'removed', value: data1Value };
      }
      if (_.isPlainObject(data1Value) && _.isPlainObject(data2Value)) {
        return { key, type: 'nested', value: generateDiff(data1Value, data2Value) };
      }
      if (!_.isEqual(data1Value, data2Value)) {
        return {
          key, type: 'changed', value1: data1Value, value2: data2Value,
        };
      }
      return { key, type: 'none', value: data1Value };
    });
};

export default generateDiff;
