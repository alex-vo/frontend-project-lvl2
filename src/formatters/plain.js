const stringify = (o) => {
  if (typeof o === 'string') return `'${o}'`;
  if (!o) return o;
  if (typeof o !== 'object' || Array.isArray(o)) return JSON.stringify(o);

  return '[complex value]';
};

const plain = (diff, prefix) => diff.filter(({ type }) => type !== 'none')
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
        return `Property '${prefix}${key}' was added with value: ${stringify(newValue)}`;
      case 'removed':
        return `Property '${prefix}${key}' was removed`;
      case 'nested':
        return plain(newValue, `${prefix}${key}.`);
      case 'changed':
        return `Property '${prefix}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      default:
        throw Error(`Unexpected diff type '${type}'.`);
    }
  })
  .join('\n');

export default (diff) => plain(diff, '');
