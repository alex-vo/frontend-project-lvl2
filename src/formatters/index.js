import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formattersByFormat = {
  stylish,
  plain,
  json: JSON.stringify,
};

const formatDiff = (format, diff) => {
  if (!_.has(formattersByFormat, format)) {
    throw Error(`Unrecognized format ${format}.`);
  }

  return formattersByFormat[format](diff);
};

export default formatDiff;
