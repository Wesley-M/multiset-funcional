/** 
 * Um multi-conjunto (ou bag) é uma estrutura que representa uma coleção de objetos 
 * que permite duplicatas. Entretanto, as duplicatas são armazenadas como a quantidade 
 * de ocorréncias do mesmo elemento no multi-conjunto. 
 * 
 * Por exemplo, a coleção {a,b,c,c,c,b} poderia ser representada como: {(a,1), (b,2), (c,3)}. 
*/

/**
 * Tipo Bag genérico
*/
type Bag<T> = Map<T, number>;

/**
 * Checa se o elemento está incluso na Bag.
*/
function hasElement<T>(elem: T, bag: Bag<T>): boolean {
  return bag.has(elem);
}

/**
 * Insere um elemento na estrutura. Caso o elemento já existe, sua
 * quantidade na estrutura será incrementada.
 */
function insert<T>(elem: T, bag: Bag<T>): Bag<T> {
  let newQuantity = 1;

  if (hasElement(elem, bag)) {
    const oldQuantity = bag.get(elem) as number;
    newQuantity = oldQuantity + 1;
  }

  return bag.set(elem, newQuantity);
}

/**
 * Remove um elemento da estrutura, levando em consideração a manipulação de sua
 * quantidade na estrutura. Caso a quantidade atinja 0 (ou menos), o elemento deve
 * realmente ser removido da estrutura.
 */
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

/**
 * Busca um elemento na estrutura, retornando sua quantidade. Caso o 
 * elemento não exista, retorna 0 como a quantidade.
*/
function search<T>(elem: T, bag: Bag<T>): number {
  let quantity = 0;

  if (hasElement(elem, bag)) {
    quantity = bag.get(elem) as number;
  }

  return quantity;
}

/**
 * Faz a interseção deste Bag com otherBag. A interseção consiste em ter os elementos
 * que estão em ambos os bags combinados com a função passada como parâmetro.
 * 
 * Por exemplo:
 * 
 * A = {(a,3),(b,1)}
 * B = {(a,1)}
 * função: + (soma)
 * 
 * A.intersection(B) == {(a,4)}
*/
function intersectionWith<T>(
  bag: Bag<T>,
  anotherBag: Bag<T>,
  fn: (n1: number, n2: number) => number
): Bag<T> {
  const anotherBagEntries = Array.from(anotherBag.entries());

  const intersectEntries: [T, number][] = anotherBagEntries
    .filter(([key, _]) => hasElement(key, bag))
    .map(([key, quantity]) => [key, fn(quantity, search(key, bag))]);

  const intersection = new Map<T, number>(intersectEntries);
  return intersection;
}

/**
 * Faz a união deste Bag com anotherBag combinando. A união consiste em ter os elementos 
 * dos dois Bags combinados com a função passada como parâmetro.
 * 
 * Por exemplo: 
 * 
 * A = {(a,3),(c,3)}, 
 * B = {(a,4),(b,2),(c,2)}. 
 * função: * (multiplicação)
 * 
 * A.union(B) == {(a,12),(c,6),(b,2)}
*/
function unionWith<T>(
  bag: Bag<T>,
  anotherBag: Bag<T>,
  fn: (n1: number, n2: number) => number
): Bag<T> {
  const intersection = intersectionWith(bag, anotherBag, fn);

  const union = new Map<T, number>([...anotherBag, ...bag, ...intersection]);
  return union;
}

/**
 * Faz a união deste Bag com anotherBag. A união consiste em ter os elementos 
 * dos dois Bags com suas maiores quantidades. 
 * 
 * Por exemplo: 
 * 
 * A = {(a,1),(c,3)}, 
 * B = {(b,2),(c,1)}. 
 * 
 * A.union(B) == {(a,1),(c,3),(b,2)}
*/
function union<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  return unionWith(bag, anotherBag, Math.max);
}

/**
 * Faz a interseção deste Bag com otherBag. A interseção consiste em ter os elementos
 * que estão em ambos os bags com suas menores quantidades. 
 * 
 * Por exemplo:
 * 
 * A = {(a,3),(b,1)}
 * B = {(a,1)}
 * 
 * A.intersection(B) == {(a,1)}
 * 
 * Obs: Caso nenhum elemento de A esteja contido em B, então a interseção é vazia.
*/
function intersection<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  return intersectionWith(bag, anotherBag, Math.min);
}

/**
 * Faz a diferenca deste Bag com otherBag. A diferenca A \ B entre bags é definida como:
 *   - Contem os elementos de A que nao estao em B;
 *   - Contem os elementos x de A que estao em B mas com sua quantidade subtraida (qtde em A - qtde em B). 
 *     Caso essa quantidade seja negativa o elemento deve serremovido do Bag. 
 * 
 * Por exemplo: 
 * 
 * A = {(a,3),(b,1)}
 * B = {(b,2),(a,1)} 
 * 
 * A.minus(B) == {(a,2)}
 */
function minus<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  let minusMap = new Map();

  const bagEntries = Array.from(bag.entries());

  bagEntries.forEach(([key, quantity]) => {
    const quantityDiff = quantity - search(key, anotherBag);
    if (quantityDiff > 0) minusMap.set(key, quantityDiff);
  });

  return minusMap;
}

/**
 * Testa se este Bag está incluso em otherBag. Para todo elemento deste bag, sua quantidade
 * deve ser menor or igual a sua quantidade em otherBag.
 * 
 * Por exemplo:
 * 
 * A = {(a,7),(b,5)}
 * B = {(a,9),(b,6))}
 * 
 * A.inclusion(B) == true
 * B.inclusion(A) == false
 * 
 */

function inclusion<T>(bag: Bag<T>, anotherBag: Bag<T>): boolean {
  const bagEntries = Array.from(bag.entries());

  return bagEntries.every(([key, quantity]) => {
    return search(key, anotherBag) >= quantity;
  });
}

/**
 * Realiza a soma deste Bag com otherBag. A soma de dois bags contem os elementos dos dois bags com suas quantidades somadas.
 * 
 * Por exemplo:
 * 
 * A = {(a,1),(b,3)}
 * B = {(a,3)}
 * 
 * A.sum(B) == {(a,4),(b,3)}
 */
function sum<T>(bag: Bag<T>, anotherBag: Bag<T>): Bag<T> {
  return unionWith(bag, anotherBag, (a, b) => a + b);
}

/**
 * Retorna a quantidade total de elementos no Bag
 */

function size<T>(bag: Bag<T>): number {
  const values = Array.from(bag.values());
  return values.reduce((currentSum, number) => currentSum + number, 0);
}

export {
  insert,
  remove,
  search,
  union,
  intersection,
  minus,
  inclusion,
  sum,
  size,
};
