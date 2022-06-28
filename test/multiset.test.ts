import { insert, remove, search, union, size } from '../src/multiset'

describe('insert', () => {
  it('Adiciona valor em multiset vazio', () => {
    const bag = new Map();
    expect(insert(2, bag)).toEqual(new Map([[2, 1]]));
    expect(insert(2, bag)).toEqual(new Map([[2, 2]]));
    expect(insert(3, bag)).toEqual(new Map([[2, 2], [3, 1]]));
  });
});

describe('remove', () => {
  it('Remove um elemento de uma bag vazia', () => {
    const bag = new Map();
    expect(remove("a", bag)).toEqual(new Map())
  });

  it('Remove um elemento de uma bag com elementos', () => {
    const bag = new Map([["a", 4], ["b", 1]]);
    expect(remove("a", bag)).toEqual(new Map([["a", 3], ["b", 1]]))
    expect(remove("b", bag)).toEqual(new Map([["a", 3]]))
  })
});

describe('search', () => {
  it('Busca um elemento em uma bag vazia', () => {
    const bag = new Map();
    expect(search("a", bag)).toEqual(0)
  });

  it('Busca um elemento de uma bag com elementos', () => {
    const bag = new Map([["a", 4], ["b", 1]]);
    expect(search("a", bag)).toEqual(4)
    expect(search("b", bag)).toEqual(1)
  })
});

describe('union', () => {
  it('Aplica operação de união entre duas bags vazias', () => {
    const bag1 = new Map();
    const bag2 = new Map();
    expect(union(bag1, bag2)).toEqual(new Map())
  });

  it('Aplica operação de união entre uma bag vazia e uma com elementos', () => {
    const bag1 = new Map();
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(union(bag1, bag2)).toEqual(new Map([["a", 10], ["b", 5]]))
  });

  it('Aplica operação de união duas bags', () => {
    const bag1 = new Map([["a", 1], ["b", 7], ["c", 20]]);
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(union(bag1, bag2)).toEqual(new Map([["a", 10], ["b", 7], ["c", 20]]))
  });
});

describe('size', () => {
  it('Tamanho de uma bag vazia', () => {
    const bag = new Map();
    expect(size(bag)).toEqual(0)
  });

  it('Tamanho de uma bag com 10 elementos', () => {
    const bag = new Map([["a", 2], ["b", 3], ["c", 5]]);
    expect(size(bag)).toEqual(10)
  });
});
