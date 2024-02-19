import { Group, mockGroupFactory } from "@/entities";
import { IComponent } from "@/systems";
import { Actor } from "@/entities/actor";
import { Settings } from "@/settings";

class C1 implements IComponent {
  public entity!: Group;
  public awake(): void {
    /*...*/
  }
  public update(_: number): void {
    /*...*/
  }
}

class C2 implements IComponent {
  public entity!: Group;
  public awake(): void {
    /*...*/
  }
  public update(_: number): void {
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
    const spyAwake1 = jest.spyOn(c1, "awake");
    const spyAwake2 = jest.spyOn(c2, "awake");

    const spyUpdate1 = jest.spyOn(c1, "update");
    const spyUpdate2 = jest.spyOn(c2, "update");

    expect(spyAwake1).not.toHaveBeenCalled();
    expect(spyAwake2).not.toHaveBeenCalled();

    expect(spyUpdate1).not.toHaveBeenCalled();
    expect(spyUpdate2).not.toHaveBeenCalled();

    group.addComponent(c1);
    group.addComponent(c2);

    group.awake();
    expect(spyAwake1).toHaveBeenCalled();
    expect(spyAwake2).toHaveBeenCalled();

    group.update(1);
    expect(spyUpdate1).toHaveBeenCalled();
    expect(spyUpdate2).toHaveBeenCalled();
  });

  it("should awake and update all children", () => {
    const spyActorAwake = jest.spyOn(Actor.prototype, "awake");
    const spyActorUpdate = jest.spyOn(Actor.prototype, "update");

    expect(spyActorAwake).not.toHaveBeenCalled();
    expect(spyActorUpdate).not.toHaveBeenCalled();

    group.awake();
    expect(spyActorAwake).toHaveBeenCalledTimes(Settings.actors.groupSize);

    group.update(1);
    expect(spyActorUpdate).toHaveBeenCalledTimes(Settings.actors.groupSize);
  });
});
