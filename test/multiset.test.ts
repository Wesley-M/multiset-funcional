import { insert, deleteFromBag } from '../src/multiset'

describe('insert', () => {
  it('Adiciona valor em multiset vazio', () => {
    const bag = new Map();
    expect(insert(2, bag)).toEqual(new Map([[2, 1]]));
    expect(insert(2, bag)).toEqual(new Map([[2, 2]]));
    expect(insert(3, bag)).toEqual(new Map([[2, 2], [3, 1]]));
  });
});

describe('deconste', () => {
  it('Remove um elemento de uma bag vazia', () => {
    const bag = new Map();
    expect(deleteFromBag("a", bag)).toEqual(new Map())
  });

  it('Remove um elemento de uma bag com elementos', () => {
    const bag = new Map([["a", 4], ["b", 1]]);
    expect(deleteFromBag("a", bag)).toEqual(new Map([["a", 3], ["b", 1]]))
    expect(deleteFromBag("b", bag)).toEqual(new Map([["a", 3]]))
  })
});