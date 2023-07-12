// https://stackoverflow.com/a/59499895
// export {};

declare interface Array<T> {
  match(elm: T): T[];
  removeFirst(elm: T): T[];
  removeFirstMatch(cb: (elm: T) => boolean): T[];
  shuffle(): T[];
  sortBy<V>(cb: (elm: T) => V): T[];
  toCount(): Map<T, number>;
}
