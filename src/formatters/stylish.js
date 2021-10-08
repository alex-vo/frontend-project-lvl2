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
        value1,
        value2,
        value,
      },
    ) => {
      switch (type) {
        case 'added':
          return formatKeyValue(prefix, '+', key, stringify(value, `${prefix}    `));
        case 'removed':
          return formatKeyValue(prefix, '-', key, stringify(value, `${prefix}    `));
        case 'nested':
          return formatKeyValue(prefix, ' ', key, stylish(value, `${prefix}    `));
        case 'unchanged':
          return formatKeyValue(prefix, ' ', key, stringify(value, `${prefix}    `));
        case 'changed':
          return [
            formatKeyValue(prefix, '-', key, stringify(value1, `${prefix}    `)),
            formatKeyValue(prefix, '+', key, stringify(value2, `${prefix}    `)),
          ].join('\n');
        default:
          throw Error(`Unexpected diff type '${type}'.`);
      }
    });

  return `{\n${result.join('\n')}\n${prefix}}`;
};

export default (diff) => stylish(diff, '');
