import { Entity } from "./entity";
import { IComponent } from "./component.h";

describe("Entity", () => {
  class E extends Entity {}

  class C1 implements IComponent {
    public Entity: E | null = null;
    public Awake(): void {}
    public Update(deltaTime: number): void {
      console.log("C1 Update", deltaTime);
    }
  }

  class C2 implements IComponent {
    public Entity: E | null = null;
    public Awake(): void {}
    public Update(deltaTime: number): void {
      console.log("C2 Update", deltaTime);
    }
  }
  class C3 implements IComponent {
    public Entity: E | null = null;
    public Awake(): void {}
    public Update(deltaTime: number): void {
      console.log("C3 Update", deltaTime);
    }
  }

  let e: E;
  const c1 = new C1();
  const c2 = new C2();
  const c3 = new C3();

  beforeEach(() => {
    e = new E();
  });

  it("should add, remove, get, and check components", () => {
    // --- ADD --- //
    expect(e.Components.length).toBe(0);
    e.AddComponent(c1);
    e.AddComponent(c2);
    e.AddComponent(c3);

    expect(e.Components.length).toBe(3);
    expect(e.Components[0]).toBe(c1);
    expect(e.Components[1]).toBe(c2);
    expect(e.Components[2]).toBe(c3);

    e.RemoveComponent(C2);
    expect(e.Components.length).toBe(2);
    expect(e.Components[0]).toBe(c1);
    expect(e.Components[1]).toBe(c3);

    expect(e.GetComponent(C1)).toBe(c1);
    expect(e.GetComponent(C3)).toBe(c3);

    expect(e.HasComponent(C1)).toBeTruthy();
    expect(e.HasComponent(C3)).toBeTruthy();
    // --- ADD --- //
  });

  it("should throw error if component wasn't found", () => {
    expect(e.HasComponent(C1)).toBeFalsy();
    expect(() => e.GetComponent(C1)).toThrow();
  });

  it("should update all Components", () => {
    const spy1 = jest.spyOn(c1, "Update");
    const spy2 = jest.spyOn(c2, "Update");
    const spy3 = jest.spyOn(c3, "Update");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    e.AddComponent(c1);
    e.AddComponent(c2);
    e.AddComponent(c3);

    const deltaTime = 12;
    e.Update(deltaTime);

    expect(spy1).toHaveBeenCalledWith(deltaTime);
    expect(spy2).toHaveBeenCalledWith(deltaTime);
    expect(spy3).toHaveBeenCalledWith(deltaTime);
  });

  it("should call Awake on all Components", () => {
    const spy1 = jest.spyOn(c1, "Awake");
    const spy2 = jest.spyOn(c2, "Awake");
    const spy3 = jest.spyOn(c3, "Awake");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    e.AddComponent(c1);
    e.AddComponent(c2);
    e.AddComponent(c3);

    e.Awake();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});