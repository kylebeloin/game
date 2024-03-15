import { Entity } from "./entity";
import { IComponent } from "../component/component.h";

describe("Entity", () => {
  class E extends Entity {}

  class C1 implements IComponent {
    public entity: E | null = null;
    public awake(): void {}
    public update(_: number): void {}
  }

  class C2 implements IComponent {
    public entity: E | null = null;
    public awake(): void {}
    public update(_: number): void {}
  }
  class C3 implements IComponent {
    public entity: E | null = null;
    public awake(): void {}
    public update(_: number): void {}
  }

  let e: E;

  beforeEach(() => {
    e = new E();
  });

  it("should add, remove, get, and check components", () => {
    // --- ADD --- //
    function count(map: Map<any, any>): number {
      return Array.from(map.entries()).length;
    }
    expect(count(e.components)).toBe(0);
    e.addComponent(new C1());
    e.addComponent(new C2());
    e.addComponent(new C3());

    expect(count(e.components)).toBe(3);

    e.removeComponent(C2);
    expect(count(e.components)).toBe(2);

    expect(e.hasComponent(C1)).toBeTruthy();
    expect(e.hasComponent(C3)).toBeTruthy();
    // --- ADD --- //
  });

  it("should throw error if component wasn't found", () => {
    expect(e.hasComponent(C1)).toBeFalsy();
  });

  it("should update all Components", () => {
    e.addComponent(C1);
    e.addComponent(C2);
    e.addComponent(C3);

    const spy1 = jest.spyOn(e.getComponent(C1), "update");
    const spy2 = jest.spyOn(e.getComponent(C2), "update");
    const spy3 = jest.spyOn(e.getComponent(C3), "update");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    const deltaTime = 12;
    e.update(deltaTime);

    expect(spy1).toHaveBeenCalledWith(deltaTime);
    expect(spy2).toHaveBeenCalledWith(deltaTime);
    expect(spy3).toHaveBeenCalledWith(deltaTime);
  });

  it("should call Awake on all Components", () => {
    e.addComponent(C1);
    e.addComponent(C2);
    e.addComponent(C3);

    const spy1 = jest.spyOn(e.getComponent(C1), "awake");
    const spy2 = jest.spyOn(e.getComponent(C2), "awake");
    const spy3 = jest.spyOn(e.getComponent(C3), "awake");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    e.awake();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
