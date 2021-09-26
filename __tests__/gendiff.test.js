import genDiff from '../src/gendiff.js';

test('should generate diff for 2 json files', () => {
  const result = genDiff('__tests__/__fixtures__/1.json', '__tests__/__fixtures__/2.json');
  expect(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`).toEqual(result);
});
