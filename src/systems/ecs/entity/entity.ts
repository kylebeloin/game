import { IComponent } from "../component.h";
import { IEntity } from "./entity.h";
import {
  Constructor,
  InstanceMap,
  InstanceConstructor,
  isAbstractConstructor,
} from "@/utils";
import registry from "./registry";

export abstract class Entity implements IEntity {
  public get id() {
    return registry.Get(this).id;
  }

  constructor() {
    registry.Register(this);
  }

  public Update(deltaTime: number): void {
    for (let component of this._components.values())
      component.Update(deltaTime);
  }

  public Awake(): void {
    for (let component of this._components.values()) component.Awake();
  }

  protected _components: InstanceMap<IComponent> =
    registry.Get(this).components;

  public get Components(): InstanceMap<IComponent> {
    return this._components;
  }

  /**
   *
   * @param constructor - Component to retrieve
   * @returns {IComponent}
   * @throws If component not present on entity
   */
  public GetComponent<C extends IComponent>(constructor: Constructor<C>): C {
    if (!this.HasComponent(constructor)) {
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
  public AddComponent<C extends IComponent>(
    component: C | InstanceConstructor<C>
  ): C {
    if (typeof component === "function") component = new component();
    this._components.set(
      component.constructor as Constructor<IComponent>,
      component
    );
    component.Entity = this;
    return component;
  }

  public RemoveComponent<C extends IComponent>(
    constructor: Constructor<C>
  ): void {
    this._components.delete(constructor);
  }

  public HasComponent<C extends IComponent>(
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
