export type AbstractComponent<T> = Function & { prototype: T };
export type InstanceConstructor<T> = { new (...args: unknown[]): T };

export type Constructor<T> = AbstractComponent<T> | InstanceConstructor<T>;
export type InstanceMap<T> = Map<Constructor<T>, T>;

export function isAbstractConstructor<T>(
  constructor: Constructor<T>
): constructor is AbstractComponent<T> {
  return constructor.prototype !== undefined;
}

export function isInstanceConstructor<T>(
  constructor: Constructor<T>
): constructor is InstanceConstructor<T> {
  return constructor.prototype === undefined;
}
