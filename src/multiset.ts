type Bag<T> = Map<T, number>

function hasElement<T>(elem: T, bag: Bag<T>): boolean {
  return bag.has(elem);
}

function insert<T>(elem: T, bag: Bag<T>): Bag<T> {
  let newQuantity = 1;

  if(hasElement(elem, bag)) {
    const oldQuantity = bag.get(elem) as number;
    newQuantity = oldQuantity + 1
  }

  return bag.set(elem, newQuantity);
}

function remove<T>(elem: T, bag: Bag<T>): Bag<T> {
  if (hasElement(elem, bag)) {
    const oldQuantity = bag.get(elem) as number;
    if (oldQuantity === 1) {
      bag.delete(elem);
    } else {
      bag.set(elem, oldQuantity - 1);
    }
  }

  return bag;
}

function search<T>(elem: T, bag: Bag<T>): number {
  let quantity = 0;
  
  if(hasElement(elem, bag)) {
    quantity = bag.get(elem) as number;
  }

  return quantity;
}

function intersectionWith<T>(bag: Bag<T>, anotherBag: Bag<T>, fn: (n1: number, n2: number) => number): Bag<T> {
  const anotherBagEntries = Array.from(anotherBag.entries())
  
  const intersectEntries: [T, number][] = anotherBagEntries.filter(([k, _]) => hasElement(k, bag))
                                                           .map(([k, v]) => [k, fn(v, search(k, bag))]);

  const intersection = new Map<T, number>(intersectEntries)
  return intersection;
}


function unionWith<T>(bag: Bag<T>, anotherBag: Bag<T>, fn: (n1: number, n2: number) => number): Bag<T> {
  const intersection = intersectionWith(bag, anotherBag, fn);

  const union = new Map<T, number>([...anotherBag, ...bag, ...intersection])
  return union;
}

function union<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  return unionWith(bag, anotherBag, Math.max);
}

function intersection<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  return intersectionWith(bag, anotherBag, Math.min);
}

function minus<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  let minusMap = new Map();

  const bagEntries = Array.from(bag.entries())
    
  bagEntries.forEach(([k, freq]) => { 
    const freqDiff = freq - search(k, anotherBag);
    if (freqDiff > 0) minusMap.set(k, freqDiff);
  })
  
  return minusMap;
}

function inclusion<T>(bag: Bag<T>, anotherBag: Bag<T>): boolean {
  const bagEntries = Array.from(bag.entries())
      
  return bagEntries.every(([k, freq]) => { 
    return search(k, anotherBag) >= freq
  })
}

function sum<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  return unionWith(bag, anotherBag, (a, b) => a + b);
}

function size<T>(bag: Bag<T>): number {
  const values = Array.from(bag.values())
  return values.reduce((currentSum, number) => currentSum + number, 0);
}

export { insert, remove, search, union, intersection, minus, inclusion, sum, size };

