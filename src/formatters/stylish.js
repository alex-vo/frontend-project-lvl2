const stringify = (o, prefix) => {
  if (!o || typeof o === 'string') return o;
  if (typeof o !== 'object' || Array.isArray(o)) return JSON.stringify(o);

  let result = ['{'];
  for (const key of Object.keys(o)) {
    result = [...result, `${prefix}    ${key}: ${stringify(o[key], `${prefix}    `)}`];
  }
  result = [...result, `${prefix}}`];

  return result.join('\n');
};

const formatKeyValue = (prefix, typeIndicator, key, value) => `${prefix}  ${typeIndicator} ${key}: ${value}`;

const diffItemToString = (diff, key, prefix) => {
  const { type, oldValue, newValue } = diff[key];
  switch (type) {
    case 'added':
      return formatKeyValue(prefix, '+', key, stringify(newValue, `${prefix}    `));
    case 'removed':
      return formatKeyValue(prefix, '-', key, stringify(oldValue, `${prefix}    `));
    case 'none':
      return formatKeyValue(prefix, ' ', key, stylish(newValue, `${prefix}    `));
    case 'changed':
      return [
        formatKeyValue(prefix, '-', key, stringify(oldValue, `${prefix}    `)),
        formatKeyValue(prefix, '+', key, stringify(newValue, `${prefix}    `)),
      ].join('\n');
    default:
      throw Error(`Unexpected diff type '${type}'.`);
  }
};

const stylish = (diff, prefix) => {
  if (!diff || typeof diff !== 'object' || Array.isArray(diff)) return stringify(diff);

  let result = ['{'];
  for (const key of Object.keys(diff)) {
    const str = diffItemToString(diff, key, prefix);
    result = [...result, str];
  }
  result = [...result, `${prefix}}`];
  return result.join('\n');
};

export default (diff) => stylish(diff, '');
