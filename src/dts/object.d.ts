type Obj = Record<string, unknown>;

interface ObjectConstructor {
  keys<T extends object>(o: T): (keyof T)[];
  entries<T extends object>(
    o: T
  ): {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}
