const diffItemToJson = (diff, key, prefix) => {
  const { type, oldValue, newValue } = diff[key];
  switch (type) {
    case 'added':
    case 'removed':
    case 'changed':
      return [{
        property: `${prefix}${key}`,
        type,
        newValue,
        oldValue,
      }];
    case 'none':
      return json(newValue, `${prefix}${key}.`);
    default:
      throw Error(`Unexpected diff type '${type}'.`);
  }
};

const json = (diff, prefix) => {
  if (!diff || typeof diff !== 'object' || Array.isArray(diff)) return null;

  let result = [];
  for (const key of Object.keys(diff)) {
    const resultObject = diffItemToJson(diff, key, prefix);
    if (resultObject) {
      result = [...result, ...resultObject];
    }
  }

  return result;
};

export default (diff) => JSON.stringify(json(diff, ''));
