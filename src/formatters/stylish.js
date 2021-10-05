const stringify = (o, prefix) => {
  if (!o || typeof o === 'string') return o;
  if (typeof o !== 'object' || Array.isArray(o)) return JSON.stringify(o);

  const result = Object.keys(o)
    .map((key) => `${prefix}    ${key}: ${stringify(o[key], `${prefix}    `)}`);

  return `{\n${result.join('\n')}\n${prefix}}`;
};

const formatKeyValue = (prefix, typeIndicator, key, value) => `${prefix}  ${typeIndicator} ${key}: ${value}`;

const stylish = (diff, prefix) => {
  const result = diff
    .map((
      {
        key,
        type,
        oldValue,
        newValue,
      },
    ) => {
      switch (type) {
        case 'added':
          return formatKeyValue(prefix, '+', key, stringify(newValue, `${prefix}    `));
        case 'removed':
          return formatKeyValue(prefix, '-', key, stringify(oldValue, `${prefix}    `));
        case 'nested':
          return formatKeyValue(prefix, ' ', key, stylish(newValue, `${prefix}    `));
        case 'none':
          return formatKeyValue(prefix, ' ', key, stringify(newValue, `${prefix}    `));
        case 'changed':
          return [
            formatKeyValue(prefix, '-', key, stringify(oldValue, `${prefix}    `)),
            formatKeyValue(prefix, '+', key, stringify(newValue, `${prefix}    `)),
          ].join('\n');
        default:
          throw Error(`Unexpected diff type '${type}'.`);
      }
    });

  return `{\n${result.join('\n')}\n${prefix}}`;
};

export default (diff) => stylish(diff, '');
