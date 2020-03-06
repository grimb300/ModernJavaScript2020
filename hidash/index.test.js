const assert = require('assert').strict;
const { forEach, map } = require('./index');

// Generic test function
// const test = (desc, fn) => {
//   console.log('----', desc);
//   try {
//     fn();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// forEach()
it('The forEach function', () => {
  let sum = 0;
  forEach([ 1, 2, 3 ], (value) => {
    sum += value;
  });

  assert.strictEqual(sum, 6, 'Expected forEach to sum the array');
});

// map()
it('The map function', () => {
  const result = map([ 1, 2, 3 ], (value) => {
    return value * 2;
  });

  assert.deepStrictEqual(
    result,
    [ 2, 4, 6 ],
    'Expected map to double each element of the array'
  );
});
