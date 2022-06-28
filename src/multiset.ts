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

function union<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  const entries = Array.from(anotherBag.entries())
  const intersectEntries: [T, number][] = entries.filter(([k, _]) => hasElement(k, bag))
  const unionEntries: [T, number][] = intersectEntries.map(([k, v]) => [k, Math.max(v, search(k, bag))])

  const union = new Map<T, number>([...entries, ...bag.entries(), ...unionEntries])
  return union;
}

function intersection<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  const anotherBagEntries = Array.from(anotherBag.entries())
  
  let intersectEntries: [T, number][] = anotherBagEntries.filter(([k, _]) => hasElement(k, bag))
  intersectEntries = intersectEntries.map(([k, v]) => [k, Math.min(v, search(k, bag))])

  const intersection = new Map<T, number>(intersectEntries)
  return intersection;
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
  const entries = Array.from(anotherBag.entries())
  const intersectEntries: [T, number][] = entries.filter(([k, _]) => hasElement(k, bag))
  const summedEntries: [T, number][] = intersectEntries.map(([k, v]) => [k, v + search(k, bag)])
  
  const sum = new Map<T, number>([...entries, ...bag.entries(), ...summedEntries])
  return sum;
}

function size<T>(bag: Bag<T>): number {
  const values = Array.from(bag.values())
  return values.reduce((currentSum, number) => currentSum + number, 0);
}

export { insert, remove, search, union, intersection, minus, inclusion, sum, size };

