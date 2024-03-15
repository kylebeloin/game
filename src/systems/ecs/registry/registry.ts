import { IRegisterable } from "@/utils";

export abstract class Registry<T extends IRegisterable, R> {
  public abstract register(value: IRegisterable): void;

  public abstract get(value: IRegisterable | string): R;

  public abstract has(value: T | string): boolean;

  public abstract destroy(value: T | string): void;
}
