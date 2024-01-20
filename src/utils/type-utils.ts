export type Constructor<T> = { new (...args: unknown[]): T };
export type InstanceMap<T> = Map<Constructor<T>, T>;
