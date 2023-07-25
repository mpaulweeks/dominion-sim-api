// https://stackoverflow.com/a/59499895
// export {};

declare interface Array<T> {
  groupBy<V>(cb: (elm: T) => V): T[][];
  match(elm: T): T[];
  removeFirst(elm: T): T[];
  removeFirstMatch(cb: (elm: T) => boolean): T[];
  shuffle(): T[];
  sortBy<V>(cb: (elm: T) => V): T[];
  toCount(): Map<T, number>;

  // specific
  average(this: Array<number>): number;
  sum(this: Array<number>): number;
  filterEmpty(this: Array<T | undefined>): T[];
}
