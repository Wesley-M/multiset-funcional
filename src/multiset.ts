function hasElement<T>(elem: T, bag: Map<T, number>): boolean {
  return bag.has(elem);
}

function insert<T>(elem: T, bag: Map<T, number>): Map<T, number> {
  let newQuantity = 1;

  if(hasElement(elem, bag)) {
    const oldQuantity = bag.get(elem) as number;
    newQuantity = oldQuantity + 1
  }

  return bag.set(elem, newQuantity);
}

function remove<T>(elem: T, bag: Map<T, number>): Map<T, number> {
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

function search<T>(elem: T, bag: Map<T, number>): number {
  let quantity = 0;
  
  if(hasElement(elem, bag)) {
    quantity = bag.get(elem) as number;
  }

  return quantity;
}

function union<T>(bag: Map<T, number>, anotherBag: Map<T, number>): Map<T, number> {
  const entries = Array.from(anotherBag.entries())
  const intersectEntries: [T, number][] = entries.filter(([k, _]) => hasElement(k, bag))
  const unionEntries: [T, number][] = intersectEntries.map(([k, v]) => [k, Math.max(v, search(k, bag))])

  const union = new Map<T, number>([...entries, ...bag.entries(), ...unionEntries])
  return union;
}

function size<T>(bag: Map<T, number>): number {
  const values = Array.from(bag.values())
  return values.reduce((currentSum, number) => currentSum + number, 0);
}

export { insert, remove, search, union, size }
