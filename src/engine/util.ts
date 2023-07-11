export function shuffle<T>(arr: T[]): T[] {
  const out = arr.concat();
  out.sort((a,b) => Math.random() > 0.5 ? -1 : 1);
  return out;
}

export function removeFirst<T>(arr: T[], cb: (elm: T) => boolean): T[] {
  const out = arr.concat();
  const index = out.findIndex(elm => cb(elm));
  out.splice(index, 1);
  return out;
}
