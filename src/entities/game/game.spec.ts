import { Game } from "@/entities/game";
import { GameInputComponent } from "./components";
import { Grid } from "@/entities/grid";
import { Group } from "@/entities/group";

// --- ADD --- //
describe(">>> Game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
    window.requestAnimationFrame = jest
      .fn()
      .mockImplementationOnce((cb) => cb());
    // mock document.querySelector
    document.querySelector = jest.fn().mockImplementationOnce(() => {
      return document.createElement("canvas");
    });
  });

  it("should start update loop next frame after awake", () => {
    const spy = jest.spyOn(game, "Update");
    game.Awake();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should update and awake all components", () => {
    const inputSpyAwake = jest.spyOn(GameInputComponent.prototype, "Awake");
    const inputSpyUpdate = jest.spyOn(GameInputComponent.prototype, "Update");

    expect(inputSpyAwake).not.toHaveBeenCalled();
    expect(inputSpyUpdate).not.toHaveBeenCalled();

    game.Awake();

    expect(inputSpyAwake).toHaveBeenCalled();
    expect(inputSpyUpdate).toHaveBeenCalled();
  });

  it("should awake and update all children", () => {
    const spyGridAwake = jest.spyOn(Grid.prototype, "Awake");
    const spyGridUpdate = jest.spyOn(Grid.prototype, "Update");

    const spyGroupAwake = jest.spyOn(Group.prototype, "Awake");
    const spyGroupUpdate = jest.spyOn(Group.prototype, "Update");

    expect(spyGridAwake).not.toHaveBeenCalled();
    expect(spyGridUpdate).not.toHaveBeenCalled();

    expect(spyGroupAwake).not.toHaveBeenCalled();
    expect(spyGroupUpdate).not.toHaveBeenCalled();

    game.Awake();
    expect(spyGridAwake).toHaveBeenCalled();
    expect(spyGroupAwake).toHaveBeenCalled();

    game.Update();
    expect(spyGridUpdate).toHaveBeenCalled();
    expect(spyGroupUpdate).toHaveBeenCalled();
  });
});
