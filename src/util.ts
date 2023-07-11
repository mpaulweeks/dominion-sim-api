import './prototype';

export function shuffle<T>(arr: T[]): T[] {
  return arr
    .concat()
    .sort((a,b) => Math.random() > 0.5 ? -1 : 1);
}

export function removeFirst<T>(arr: T[], elm: T): T[] {
  const out = arr.concat();
  const index = out.indexOf(elm);
  if (index < 0) { throw new Error('element not found for removal: ' + elm); }
  out.splice(index, 1);
  return out;
}

export function removeFirstMatch<T>(arr: T[], cb: (elm: T) => boolean): T[] {
  const out = arr.concat();
  const index = out.findIndex(elm => cb(elm));
  out.splice(index, 1);
  return out;
}

export function range(length: number): number[] {
  const out = [] as number[];
  for (let i = 0; i < length; i++) {
    out.push(i);
  }
  return out;
}

export function repeat<T>(elm: T, count: number) {
  return range(count).map(() => elm);
}

export function toCount<T>(arr: T[]) {
  const map = new Map<T, number>();
  arr.forEach(elm => {
    map.set(elm, 1 + (map.get(elm) ?? 0));
  });
  return {
    get: (elm: T) => map.get(elm) ?? 0,
    subtract: (elm: T, num: number) => map.set(elm, (map.get(elm) ?? 0) - num),
  };
}

export function average(arr: number[]): number {
  return arr.reduce((sum, cur) => sum + cur, 0) / arr.length;
}
