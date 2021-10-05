const json = (diff, prefix) => diff
  .filter(({ type }) => type !== 'none')
  .flatMap((
    {
      key,
      type,
      oldValue,
      newValue,
    },
  ) => {
    switch (type) {
      case 'added':
      case 'removed':
      case 'changed':
        return {
          property: `${prefix}${key}`,
          type,
          newValue,
          oldValue,
        };
      case 'nested':
        return json(newValue, `${prefix}${key}.`);
      default:
        throw Error(`Unexpected diff type '${type}'.`);
    }
  });

export default (diff) => JSON.stringify(json(diff, ''));
