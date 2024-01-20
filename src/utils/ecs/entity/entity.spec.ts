import { Entity } from "./entity";
import { IComponent } from "../component.h";

describe("Entity", () => {
  class E extends Entity {}

  class C1 implements IComponent {
    public Entity: E | null = null;
    public Awake(): void {}
    public Update(_: number): void {}
  }

  class C2 implements IComponent {
    public Entity: E | null = null;
    public Awake(): void {}
    public Update(_: number): void {}
  }
  class C3 implements IComponent {
    public Entity: E | null = null;
    public Awake(): void {}
    public Update(_: number): void {}
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
    expect(count(e.Components)).toBe(0);
    e.AddComponent(new C1());
    e.AddComponent(new C2());
    e.AddComponent(new C3());

    expect(count(e.Components)).toBe(3);

    e.RemoveComponent(C2);
    expect(count(e.Components)).toBe(2);

    expect(e.HasComponent(C1)).toBeTruthy();
    expect(e.HasComponent(C3)).toBeTruthy();
    // --- ADD --- //
  });

  it("should throw error if component wasn't found", () => {
    expect(e.HasComponent(C1)).toBeFalsy();
  });

  it("should update all Components", () => {
    e.AddComponent(C1);
    e.AddComponent(C2);
    e.AddComponent(C3);

    const spy1 = jest.spyOn(e.GetComponent(C1), "Update");
    const spy2 = jest.spyOn(e.GetComponent(C2), "Update");
    const spy3 = jest.spyOn(e.GetComponent(C3), "Update");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    const deltaTime = 12;
    e.Update(deltaTime);

    expect(spy1).toHaveBeenCalledWith(deltaTime);
    expect(spy2).toHaveBeenCalledWith(deltaTime);
    expect(spy3).toHaveBeenCalledWith(deltaTime);
  });

  it("should call Awake on all Components", () => {
    e.AddComponent(C1);
    e.AddComponent(C2);
    e.AddComponent(C3);

    const spy1 = jest.spyOn(e.GetComponent(C1), "Awake");
    const spy2 = jest.spyOn(e.GetComponent(C2), "Awake");
    const spy3 = jest.spyOn(e.GetComponent(C3), "Awake");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    e.Awake();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
