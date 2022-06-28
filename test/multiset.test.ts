import { inclusion, insert, intersection, minus, remove, search, size, sum, union } from '../src/multiset';

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

describe('intersection', () => {
  it('Aplica operação de interseção entre duas bags vazias', () => {
    const bag1 = new Map();
    const bag2 = new Map();
    expect(intersection(bag1, bag2)).toEqual(new Map())
  });

  it('Aplica operação de interseção entre uma bag vazia e uma com elementos', () => {
    const bag1 = new Map();
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(intersection(bag1, bag2)).toEqual(new Map())
  });

  it('Aplica operação de interseção entre duas bags', () => {
    const bag1 = new Map([["a", 1], ["b", 7], ["c", 20]]);
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(intersection(bag1, bag2)).toEqual(new Map([["a", 1], ["b", 5]]))
  });
});

describe('minus', () => {
  it('Aplica operação de diferença entre duas bags vazias', () => {
    const bag1 = new Map();
    const bag2 = new Map();
    expect(minus(bag1, bag2)).toEqual(new Map())
  });

  it('Aplica operação de diferença entre uma bag vazia e uma com elementos', () => {
    const bag1 = new Map();
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(minus(bag1, bag2)).toEqual(new Map())
  });

  it('Aplica operação de diferença entre duas bags', () => {
    const bag1 = new Map([["a", 11], ["b", 7], ["c", 20]]);
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(minus(bag1, bag2)).toEqual(new Map([["a", 1], ["b", 2], ["c", 20]]))

    const bag3 = new Map([["a", 3], ["b", 1]]);
    const bag4 = new Map([["b", 2], ["a", 1]]);
    expect(minus(bag3, bag4)).toEqual(new Map([["a", 2]]))    
  });
});

describe('inclusion', () => {
  it('Aplica operação de inclusão entre duas bags vazias', () => {
    const bag1 = new Map();
    const bag2 = new Map();
    expect(inclusion(bag1, bag2)).toEqual(true);
  });

  it('Aplica operação de inclusão entre uma bag vazia e uma com elementos', () => {
    const bag1 = new Map();
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(inclusion(bag1, bag2)).toEqual(true);
  });

  it('Aplica operação de inclusão entre duas bags', () => {
    const bag1 = new Map([["a", 6], ["b", 4]]);
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(inclusion(bag1, bag2)).toEqual(true);
  });
});

describe('sum', () => {
  it('Aplica operação de soma entre duas bags vazias', () => {
    const bag1 = new Map();
    const bag2 = new Map();
    expect(sum(bag1, bag2)).toEqual(new Map());
  });

  it('Aplica operação de soma entre uma bag vazia e uma com elementos', () => {
    const bag1 = new Map();
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(sum(bag1, bag2)).toEqual(new Map([["a", 10], ["b", 5]]));
  });

  it('Aplica operação de soma entre duas bags', () => {
    const bag1 = new Map([["a", 6]]);
    const bag2 = new Map([["a", 10], ["b", 5]]);
    expect(sum(bag1, bag2)).toEqual(new Map([["a", 16], ["b", 5]]));
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
