import { Entity, IComponent } from "..";
import { default as entities } from "../entity/registry";
import registry from "./registry";

export class Component<T extends Entity = Entity> implements IComponent {
  private _id: string = window.crypto.randomUUID();
  private _entity!: string;

  constructor() {
    registry.register(this);
  }

  public get id() {
    return this._id;
  }

  public get entity(): T {
    return entities.get(this._entity).entity as T;
  }
  public set entity(value: string | T) {
    this._entity = typeof value === "string" ? value : value.id;
  }
  public awake(): void {}
  public update(_: number): void {}
}
