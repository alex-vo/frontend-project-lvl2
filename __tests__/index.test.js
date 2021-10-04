import genDiff from '../src';

test('should generate stylish diff for 2 json files', () => {
  const result = genDiff('__tests__/__fixtures__/1.json', '__tests__/__fixtures__/2.json', 'stylish');

  expect(result).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('should generate plain diff for 2 yaml files', () => {
  const result = genDiff('__tests__/__fixtures__/1.yaml', '__tests__/__fixtures__/2.yml', 'plain');

  expect(result).toEqual(`Property 'common.follow' was added with value: false
Property 'common.group1.baz' was updated. From 'bas' to 'bars'
Property 'common.group1.nest' was updated. From [complex value] to 'str'
Property 'common.group2' was removed
Property 'common.group3' was added with value: [complex value]
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From null to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'`);
});

test('should generate json diff for 2 json files', () => {
  const result = genDiff('__tests__/__fixtures__/1.json', '__tests__/__fixtures__/2.json', 'json');

  expect(result).toEqual('[{"property":"common.follow","type":"added","newValue":false},{"property":"common.setting2","type":"removed","oldValue":200},{"property":"common.setting3","type":"changed","newValue":null,"oldValue":true},{"property":"common.setting4","type":"added","newValue":"blah blah"},{"property":"common.setting5","type":"added","newValue":{"key5":"value5"}},{"property":"common.setting6.doge.wow","type":"changed","newValue":"so much","oldValue":""},{"property":"common.setting6.ops","type":"added","newValue":"vops"},{"property":"group1.baz","type":"changed","newValue":"bars","oldValue":"bas"},{"property":"group1.nest","type":"changed","newValue":"str","oldValue":{"key":"value"}},{"property":"group2","type":"removed","oldValue":{"abc":12345,"deep":{"id":45}}},{"property":"group3","type":"added","newValue":{"deep":{"id":{"number":45}},"fee":100500}}]');
});

test('should throw error due to unrecognized format', () => {
  expect(() => genDiff('__tests__/__fixtures__/1.json', '__tests__/__fixtures__/2.json', 'blablaformat'))
    .toThrow(new Error('Unrecognized format blablaformat.'));
});

test('should throw error due to unsupported file extension', () => {
  expect(() => genDiff('__tests__/__fixtures__/123.txt', '__tests__/__fixtures__/2.json', 'blablaformat'))
    .toThrow(new Error('Unsupported extension \'.txt\' for file \'__tests__/__fixtures__/123.txt\'.'));
});
