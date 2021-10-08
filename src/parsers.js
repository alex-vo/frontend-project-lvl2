import yaml from 'js-yaml';
import _ from 'lodash';

const parsersByType = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default ({ rawData, type }) => {
  if (!_.has(parsersByType, type)) {
    throw Error(`Unsupported type '${type}'.`);
  }

  return parsersByType[type](rawData);
};
