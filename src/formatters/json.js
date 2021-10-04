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

  return Object.keys(diff)
    .flatMap((key) => diffItemToJson(diff, key, prefix))
    .filter((resultObject) => !!resultObject);
};

export default (diff) => JSON.stringify(json(diff, ''));
