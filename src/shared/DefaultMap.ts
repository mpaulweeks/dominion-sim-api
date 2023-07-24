type DefaultFactory<K, V> = (elm: K) => V;

export class DefaultMap<K, V> {
  constructor(
    readonly map: Map<K, V>,
    readonly factory: DefaultFactory<K, V>,
  ) { }

  get(key: K): V {
    return this.map.get(key) ?? this.factory(key);
  }
  set(key: K, value: V) {
    return this.map.set(key, value);
  }
  transform(key: K, cb: (val: V) => V) {
    return this.set(key, cb(this.get(key)));
  }
  values(): V[] {
    return Array.from(this.map.values());
  }
  entries(): [K, V][] {
    return Array.from(this.map.entries());
  }

  static empty<K, V>(factory: DefaultFactory<K, V>) {
    return new DefaultMap(new Map<K, V>(), factory);
  }
}
