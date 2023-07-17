type DefaultFactory<T> = () => T;

export class DefaultMap<K, V> {
  constructor(
    readonly map: Map<K,V>,
    readonly factory: DefaultFactory<V>,
  ) { }

  get(key: K): V {
    return this.map.get(key) ?? this.factory();
  }
  set(key: K, value: V) {
    return this.map.set(key, value);
  }
  transform(key: K, cb: (val: V) => V) {
    return this.set(key, cb(this.get(key)));
  }
  values(): [K, V][] {
    return Array.from(this.map.entries());
  }
}
