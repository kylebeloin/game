import { Entity } from "..";
import { Component } from ".";
import { IRegisteredComponent } from ".";
import { Registry } from "../registry/registry";

let instance: ComponentRegistry | null = null;
let _registry = new Map<string, IRegisteredComponent>();

class ComponentRegistry extends Registry<Component, IRegisteredComponent> {
  constructor() {
    super();
    if (instance) return instance;
    instance = this;
  }

  public register<E extends Entity, C extends Component<E>>(
    component: C
  ): void {
    _registry.set(component.id, { component });
  }

  public get<E extends Entity, C extends Component<E>>(
    component: C
  ): IRegisteredComponent {
    if (typeof component === "string") {
      if (!_registry.has(component)) {
        throw new Error(
          `Entity with id ${component} does not exist or has been removed from registry.`
        );
      }
      return _registry.get(component) as IRegisteredComponent;
    } else {
      const { id } = component;
      if (!_registry.has(id)) {
        this.register(component);
      }

      return _registry.get(id) as IRegisteredComponent;
    }
  }

  public has(value: Component | string): boolean {
    const id = typeof value === "string" ? value : value.id;
    return _registry.has(id);
  }

  public destroy(value: Component | string): void {
    const id = typeof value === "string" ? value : value.id;
    _registry.delete(id);
  }
}

let registry = Object.freeze(new ComponentRegistry());

export default registry;
