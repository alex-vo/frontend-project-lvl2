const stringify = (o) => {
  if (typeof o === 'string') return `'${o}'`;
  if (!o) return o;
  if (typeof o !== 'object' || Array.isArray(o)) return JSON.stringify(o);

  return '[complex value]';
};

const diffItemToString = (diff, key, prefix) => {
  const { type, oldValue, newValue } = diff[key];
  switch (type) {
    case 'added':
      return `Property '${prefix}${key}' was added with value: ${stringify(newValue)}`;
    case 'removed':
      return `Property '${prefix}${key}' was removed`;
    case 'none':
      return plain(newValue, `${prefix}${key}.`);
    case 'changed':
      return `Property '${prefix}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
    default:
      throw Error(`Unexpected diff type '${type}'.`);
  }
};

const plain = (diff, prefix) => {
  if (!diff || typeof diff !== 'object' || Array.isArray(diff)) return null;

  let result = [];
  for (const key of Object.keys(diff)) {
    const str = diffItemToString(diff, key, prefix);
    if (str) {
      result = [...result, str];
    }
  }

  return result.join('\n');
};

export default (diff) => plain(diff, '');
