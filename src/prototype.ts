import { DefaultMap } from "./shared/DefaultMap";

Array.prototype.groupBy = function<T, V>(this: T[], cb: (elm: T) => V): T[][] {
  const map = new DefaultMap<V, T[]>(new Map(), () => []);
  this.forEach(elm => {
    const key = cb(elm);
    map.set(key, map.get(key).concat(elm));
  });
  return map.values().map(tuple => tuple[1]);
}

Array.prototype.match = function<T>(this: T[], elm: T): T[] {
  return this.filter(e => e === elm);
}

Array.prototype.removeFirst = function<T>(this: T[], elm: T): T[] {
  const out = this.concat();
  const index = out.indexOf(elm);
  if (index < 0) { throw new Error('element not found for removal: ' + elm); }
  out.splice(index, 1);
  return out;
}

Array.prototype.removeFirstMatch = function<T>(this: T[], cb: (elm: T) => boolean): T[] {
  const out = this.concat();
  const index = out.findIndex(elm => cb(elm));
  out.splice(index, 1);
  return out;
}

Array.prototype.shuffle = function<T>(this: T[]): T[] {
  return this
    .concat()
    .sort((a,b) => Math.random() > 0.5 ? -1 : 1);
}

Array.prototype.sortBy = function<T, V>(this: T[], cb: (elm: T) => V): T[] {
  return this.concat().sort((a,b) => cb(a) < cb(b) ? -1 : 1);
}

Array.prototype.toCount = function<T>(this: T[]) {
  const map = new Map<T, number>();
  this.forEach(elm => {
    map.set(elm, 1 + (map.get(elm) ?? 0));
  });
  return map;
}

Array.prototype.average = function(this: number[]): number {
  return this.sum() / this.length;
}

Array.prototype.sum = function(this: number[]): number {
  return this.reduce((sum, cur) => sum + cur, 0);
}
