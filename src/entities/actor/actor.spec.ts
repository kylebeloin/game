import { Actor, mockActorFactory, ActorDrawComponent } from "@/entities/actor";

describe(">>> Actor", () => {
  let Actor: Actor;

  beforeEach(() => {
    Actor = mockActorFactory();
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(ActorDrawComponent.prototype, "Awake");
    const spyDrawCompUpdate = jest.spyOn(
      ActorDrawComponent.prototype,
      "Update"
    );

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    Actor.Awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    Actor.Update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });
});
