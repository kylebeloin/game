import { Actor, mockActorFactory, ActorDrawComponent } from "@/entities/actor";

describe(">>> Actor", () => {
  let Actor: Actor;

  beforeEach(() => {
    Actor = mockActorFactory();
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(ActorDrawComponent.prototype, "awake");
    const spyDrawCompUpdate = jest.spyOn(
      ActorDrawComponent.prototype,
      "update"
    );

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    Actor.awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    Actor.update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });
});
