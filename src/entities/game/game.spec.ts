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
    const spy = jest.spyOn(game, "update");
    game.awake();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should update and awake all components", () => {
    const inputSpyAwake = jest.spyOn(GameInputComponent.prototype, "awake");
    const inputSpyUpdate = jest.spyOn(GameInputComponent.prototype, "update");

    expect(inputSpyAwake).not.toHaveBeenCalled();
    expect(inputSpyUpdate).not.toHaveBeenCalled();

    game.awake();

    expect(inputSpyAwake).toHaveBeenCalled();
    expect(inputSpyUpdate).toHaveBeenCalled();
  });

  it("should awake and update all children", () => {
    const spyGridAwake = jest.spyOn(Grid.prototype, "awake");
    const spyGridUpdate = jest.spyOn(Grid.prototype, "update");

    const spyGroupAwake = jest.spyOn(Group.prototype, "awake");
    const spyGroupUpdate = jest.spyOn(Group.prototype, "update");

    expect(spyGridAwake).not.toHaveBeenCalled();
    expect(spyGridUpdate).not.toHaveBeenCalled();

    expect(spyGroupAwake).not.toHaveBeenCalled();
    expect(spyGroupUpdate).not.toHaveBeenCalled();

    game.awake();
    expect(spyGridAwake).toHaveBeenCalled();
    expect(spyGroupAwake).toHaveBeenCalled();

    game.update();
    expect(spyGridUpdate).toHaveBeenCalled();
    expect(spyGroupUpdate).toHaveBeenCalled();
  });
});
