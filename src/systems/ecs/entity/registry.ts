import type { IRegisteredEntity } from "./registry.h";
import type { Entity } from "..";

let instance: EntityRegistry | null = null;
let id = 0;
let _registry = new Map<Entity, IRegisteredEntity>();
// stores reference to entity id in _registry

class EntityRegistry {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  public register<E extends Entity>(entity: E): void {
    _registry.set(entity, { id: id++, components: new Map() });
  }

  public get<E extends Entity>(entity: E | number): IRegisteredEntity {
    if (typeof entity === "number") {
      for (let [instance, registeredEntity] of _registry) {
        if (registeredEntity.id === entity)
          return this.get(instance) as IRegisteredEntity;
      }
      throw new Error("Entity not found.");
    }
    if (!_registry.has(entity)) {
      this.register(entity);
    }
    return _registry.get(entity) as IRegisteredEntity;
  }

  public has<E extends Entity>(entity: E): boolean {
    return _registry.has(entity);
  }

  public destroy<E extends Entity>(entity: E): void {
    _registry.delete(entity);
  }
}

let registry = Object.freeze(new EntityRegistry());

export default registry;
