export class HistoryTracker<T> {
  private arr: T[] = [];
  constructor(
    private readonly factory: () => T
  ) {
    this.arr.push(factory());
  }

  toArray(): T[] {
    return this.arr.concat();
  }

  get latest(): T {
    return this.arr.slice(-1)[0]!;
  }
  get(index: number): T {
    if (!this.arr[index]) {
      this.arr[index] = this.factory();
    }
    return this.arr[index];
  }
  next() {
    this.arr.push(this.factory());
    return this.latest;
  }
}
