import fs from 'fs';
import genDiff from '../src';

const cases = [['stylish', 'json'], ['plain', 'yml'], ['plain', 'yaml'], ['json', 'json']];

describe('calculate and format diff', () => {
  test.each(cases)(
    'should generate %s diff for 2 %s files',
    (format, extension) => {
      const result = genDiff(`__tests__/__fixtures__/first.${extension}`, `__tests__/__fixtures__/second.${extension}`, format);
      expect(result).toEqual(fs.readFileSync(`__tests__/__fixtures__/expected_result_${format}.txt`, { encoding: 'utf-8' }));
    },
  );
});

test('should throw error due to unrecognized format', () => {
  expect(() => genDiff('__tests__/__fixtures__/first.json', '__tests__/__fixtures__/second.json', 'blablaformat'))
    .toThrow(new Error('Unrecognized format blablaformat.'));
});

test('should throw error due to unsupported file extension', () => {
  expect(() => genDiff('__tests__/__fixtures__/123.txt', '__tests__/__fixtures__/second.json', 'blablaformat'))
    .toThrow(new Error('Unsupported type \'txt\'.'));
});
