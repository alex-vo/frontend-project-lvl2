import yaml from 'js-yaml';

const parseData = ({ rawData, extension }) => {
  switch (extension) {
    case 'json':
      return JSON.parse(rawData);
    case 'yml':
    case 'yaml':
      return yaml.load(rawData);
    default:
      throw Error(`Unsupported extension '${extension}'.`);
  }
};

export default parseData;
