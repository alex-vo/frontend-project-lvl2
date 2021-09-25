import genDiff from '../src/gendiff.js';

test('1', () => {
  const result = genDiff('__tests__/resources/1.json', '__tests__/resources/2.json');
  expect(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`).toEqual(result);
});
