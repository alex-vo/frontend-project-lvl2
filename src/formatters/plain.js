const stringify = (o) => {
  if (typeof o === 'string') return `'${o}'`;
  if (!o) return o;
  if (typeof o !== 'object' || Array.isArray(o)) return JSON.stringify(o);

  return '[complex value]';
};

const plain = (diff, prefix) => diff
  .filter(({ type }) => type !== 'unchanged')
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
        return `Property '${prefix}${key}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${prefix}${key}' was removed`;
      case 'nested':
        return plain(value, `${prefix}${key}.`);
      case 'changed':
        return `Property '${prefix}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      default:
        throw Error(`Unexpected diff type '${type}'.`);
    }
  })
  .join('\n');

export default (diff) => plain(diff, '');
