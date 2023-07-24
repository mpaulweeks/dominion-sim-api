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
