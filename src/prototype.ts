Array.prototype.match = function<T>(this: T[], elm: T): T[] {
  return this.filter(e => e === elm);
}

Array.prototype.sortBy = function<T, V>(this: T[], cb: (elm: T) => V): T[] {
  return this.concat().sort((a,b) => cb(a) < cb(b) ? -1 : 1);
}
