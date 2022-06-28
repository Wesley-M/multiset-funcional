const multiset = require("./multiset.js");

test("Adiciona valor em multiset vazio", () => {
  let ms = new Map();
  expect(multiset.insert(2, ms)).toEqual(new Map([[2, 0]]));
  expect(multiset.insert(2, ms)).toEqual(new Map([[2, 1]]));
  expect(multiset.insert(3, ms)).toEqual(new Map([[2, 1], [3, 0]]));
});
