import { IComponent } from "./component.h";
import { IUpdate, IAwake } from "@/utils";

type constr<T> = { new (...args: unknown[]): T };

export abstract class Entity implements IAwake, IUpdate {
  public Update(deltaTime: number): void {
    for (const c of this._components) {
      c.Update(deltaTime);
    }
  }

  public Awake(): void {
    for (const component of this._components) {
      component.Awake();
    }
  }

  protected _components: IComponent[] = [];

  public get Components(): IComponent[] {
    return this._components;
  }

  public GetComponent<C extends IComponent>(constr: constr<C>): C {
    for (const c of this._components) {
      if (c instanceof constr) {
        return c as C;
      }
    }
    throw new Error(`Component ${constr.name} not found`);
  }

  public AddComponent<C extends IComponent>(component: C): C {
    this._components.push(component);
    component.Entity = this;
    return component;
  }

  public RemoveComponent<C extends IComponent>(constr: constr<C>): void {
    let toRemove: IComponent | undefined = undefined;
    let index: number | undefined = undefined;

    for (let i = 0; i < this._components.length; i++) {
      const c = this._components[i];
      if (c instanceof constr) {
        toRemove = c;
        index = i;
        break;
      }
    }

    if (toRemove && index) {
      toRemove.Entity = null;
      this._components.splice(index, 1);
    }
  }

  public HasComponent<C extends IComponent>(constr: constr<C>): boolean {
    for (const c of this._components) {
      if (c instanceof constr) {
        return true;
      }
    }
    return false;
  }
}
