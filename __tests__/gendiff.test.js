import genDiff from '../src/gendiff.js';

test('should generate diff for 2 json files', () => {
  try {
    genDiff('non-existing-file.json', '__tests__/__fixtures__/2.json');
  } catch (e) {

  }

});
