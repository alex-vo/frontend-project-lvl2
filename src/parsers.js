import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const extractFileContent = (filePath) => fs.readFileSync(filePath).toString();

function extractObject(rawData, extension) {
  switch (extension) {
    case '.json':
      return JSON.parse(rawData);
    case '.yml':
    case '.yaml':
      return yaml.load(rawData);
    default:
      throw Error(`Unsupported extension '${extension}'.`);
  }
}

const isJson = (extension) => extension && extension.toLowerCase() === '.json';

const isYaml = (extension) => extension && (extension.toLowerCase() === '.yml' || extension.toLowerCase() === '.yaml');

const areCompatibleExtensions = (extension1, extension2) =>
  (isJson(extension1) && isJson(extension2))
  || (isYaml(extension1) && isYaml(extension2));

const checkExtensions = (files, firstFileExtension) => files.every(({ extension }) => {
  if (areCompatibleExtensions(extension, firstFileExtension)) {
    return true;
  }

  throw Error(`Incompatible extensions '${extension}' and '${firstFileExtension}'.`);
});

const parseFiles = (...filePaths) => {
  const files = filePaths.map((filePath) => ({ filePath, extension: path.extname(filePath) }));

  checkExtensions(files, files[0].extension);

  return files
    .map(({ filePath, extension }) => ({ rawData: extractFileContent(filePath), extension }))
    .map(({ rawData, extension }) => extractObject(rawData, extension));
};

export default parseFiles;
