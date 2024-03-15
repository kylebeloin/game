import type { IRegisteredEntity } from "./registry.h";
import type { Entity } from "..";

let instance: EntityRegistry | null = null;
let _registry = new Map<string, IRegisteredEntity>();
// stores reference to entity id in _registry

class EntityRegistry {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  public register<E extends Entity>(entity: E): void {
    _registry.set(entity.id, { entity, components: new Map() });
  }

  public get<E extends Entity>(entity: E | string): IRegisteredEntity {
    if (typeof entity === "string") {
      if (!_registry.has(entity)) {
        throw new Error(
          `Entity with id ${entity} does not exist or has been removed from registry.`
        );
      }
      return _registry.get(entity) as IRegisteredEntity;
    } else {
      const { id } = entity;
      if (!_registry.has(id)) {
        this.register(entity);
      }
      return _registry.get(id) as IRegisteredEntity;
    }
  }

  public has<E extends Entity>(value: E | string): boolean {
    const id = typeof value === "string" ? value : value.id;
    return _registry.has(id);
  }

  public destroy<E extends Entity>(value: E | string): void {
    const id = typeof value === "string" ? value : value.id;
    _registry.delete(id);
  }
}

let registry = Object.freeze(new EntityRegistry());

export default registry;
