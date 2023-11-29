import { Game } from "@/game";
import { IComponent } from "@/utils";
import { Grid } from "@/grid";

class C1 implements IComponent {
  public Entity: Game | null = null;
  public Awake(): void {
    /*...*/
  }
  public Update(deltaTime: number): void {
    console.log("C1 Update", deltaTime);
  }
}
class C2 implements IComponent {
  public Entity: Game | null = null;
  public Awake(): void {
    /*...*/
  }
  public Update(deltaTime: number): void {
    console.log("C2 Update", deltaTime);
  }
}
class C3 implements IComponent {
  public Entity: Game | null = null;
  public Awake(): void {
    /*...*/
  }
  public Update(deltaTime: number): void {
    console.log("C3 Update", deltaTime);
  }
}
// --- ADD --- //
describe(">>> Game", () => {
  let game: Game;

  const c1 = new C1();
  const c2 = new C2();
  const c3 = new C3();

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

  it("should awake all Components", () => {
    const spy1 = jest.spyOn(c1, "Awake");
    const spy2 = jest.spyOn(c2, "Awake");
    const spy3 = jest.spyOn(c3, "Awake");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    game.AddComponent(c1);
    game.AddComponent(c2);
    game.AddComponent(c3);

    game.Awake();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it("should update all Components", () => {
    const spy1 = jest.spyOn(c1, "Update");
    const spy2 = jest.spyOn(c2, "Update");
    const spy3 = jest.spyOn(c3, "Update");

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    game.AddComponent(c1);
    game.AddComponent(c2);
    game.AddComponent(c3);

    game.Update();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it("should awake and update all children", () => {
    const spyGridAwake = jest.spyOn(Grid.prototype, "Awake");
    const spyGridUpdate = jest.spyOn(Grid.prototype, "Update");

    expect(spyGridAwake).not.toHaveBeenCalled();
    expect(spyGridUpdate).not.toHaveBeenCalled();

    game.Awake();
    expect(spyGridAwake).toHaveBeenCalled();

    game.Update();
    expect(spyGridUpdate).toHaveBeenCalled();
  });
});
