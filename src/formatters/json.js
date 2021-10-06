const json = (diff, prefix) => diff
  .filter(({ type }) => type !== 'none')
  .flatMap((
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
      case 'removed':
      case 'changed':
        return {
          property: `${prefix}${key}`,
          type,
          value1,
          value2,
          value,
        };
      case 'nested':
        return json(value, `${prefix}${key}.`);
      default:
        throw Error(`Unexpected diff type '${type}'.`);
    }
  });

export default (diff) => JSON.stringify(json(diff, ''));
