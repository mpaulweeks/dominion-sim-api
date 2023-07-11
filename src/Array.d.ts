// https://stackoverflow.com/a/59499895
// export {};

declare interface Array<T> {
  sortBy<V>(cb: (elm: T) => V): T[];
}
