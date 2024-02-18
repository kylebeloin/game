import { Group, mockGroupFactory } from "@/entities";
import { IComponent } from "@/systems";
import { Actor } from "@/entities/actor";
import { Settings } from "@/settings";

class C1 implements IComponent {
  public Entity!: Group;
  public Awake(): void {
    /*...*/
  }
  public Update(_: number): void {
    /*...*/
  }
}

class C2 implements IComponent {
  public Entity!: Group;
  public Awake(): void {
    /*...*/
  }
  public Update(_: number): void {
    /*...*/
  }
}

describe(">>> Group", () => {
  let group: Group;

  const c1 = new C1();
  const c2 = new C2();

  beforeEach(() => {
    group = mockGroupFactory();
  });

  it("should awake and update all Components", () => {
    const spyAwake1 = jest.spyOn(c1, "Awake");
    const spyAwake2 = jest.spyOn(c2, "Awake");

    const spyUpdate1 = jest.spyOn(c1, "Update");
    const spyUpdate2 = jest.spyOn(c2, "Update");

    expect(spyAwake1).not.toHaveBeenCalled();
    expect(spyAwake2).not.toHaveBeenCalled();

    expect(spyUpdate1).not.toHaveBeenCalled();
    expect(spyUpdate2).not.toHaveBeenCalled();

    group.AddComponent(c1);
    group.AddComponent(c2);

    group.Awake();
    expect(spyAwake1).toHaveBeenCalled();
    expect(spyAwake2).toHaveBeenCalled();

    group.Update(1);
    expect(spyUpdate1).toHaveBeenCalled();
    expect(spyUpdate2).toHaveBeenCalled();
  });

  it("should awake and update all children", () => {
    const spyActorAwake = jest.spyOn(Actor.prototype, "Awake");
    const spyActorUpdate = jest.spyOn(Actor.prototype, "Update");

    expect(spyActorAwake).not.toHaveBeenCalled();
    expect(spyActorUpdate).not.toHaveBeenCalled();

    group.Awake();
    expect(spyActorAwake).toHaveBeenCalledTimes(Settings.actors.groupSize);

    group.Update(1);
    expect(spyActorUpdate).toHaveBeenCalledTimes(Settings.actors.groupSize);
  });
});
