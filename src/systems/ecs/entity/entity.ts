import { IComponent } from "../component/component.h";
import { IEntity } from "./entity.h";
import {
  Constructor,
  InstanceMap,
  InstanceConstructor,
  isAbstractConstructor,
} from "@/utils";
import registry from "./registry";

export abstract class Entity implements IEntity {
  private _id: string = window.crypto.randomUUID();
  public get id(): string {
    return this._id;
  }

  constructor() {
    registry.register(this);
  }

  public update(deltaTime: number): void {
    for (let component of this._components.values())
      component.update(deltaTime);
  }

  public awake(): void {
    for (let component of this._components.values()) component.awake();
  }

  protected _components: InstanceMap<IComponent> =
    registry.get(this).components;

  public get components(): InstanceMap<IComponent> {
    return this._components;
  }

  /**
   *
   * @param constructor - Component to retrieve
   * @returns {IComponent}
   * @throws If component not present on entity
   */
  public getComponent<C extends IComponent>(constructor: Constructor<C>): C {
    if (!this.hasComponent(constructor)) {
      throw new Error("Component does not exist on entity.");
    }
    if (isAbstractConstructor(constructor)) {
      for (let component of this._components.keys()) {
        if (component.prototype instanceof constructor)
          return this._components.get(component) as C;
      }
    }
    return this._components.get(constructor) as C;
  }

  /**
   * An entity should only have one component per type of component.
   * @param component - Component to add to entity
   * @returns
   */
  public addComponent<C extends IComponent>(
    component: C | InstanceConstructor<C>
  ): C {
    if (typeof component === "function") component = new component();
    this._components.set(component.constructor, component);
    component.entity = this;
    return component;
  }

  public removeComponent<C extends IComponent>(
    constructor: Constructor<C>
  ): void {
    this._components.delete(constructor);
  }

  public hasComponent<C extends IComponent>(
    constructor: Constructor<C>
  ): boolean {
    if (isAbstractConstructor(constructor)) {
      for (let component of this._components.keys()) {
        if (component.prototype instanceof constructor) return true;
      }
    }
    return this._components.has(constructor);
  }
}
