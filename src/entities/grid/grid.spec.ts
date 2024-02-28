import { GridOnClickComponent } from "./components";
import { Tile, Grid } from "@/entities";
import { Settings } from "@/settings";

describe(">>> Grid", () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension;
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid();
    document.querySelector = jest.fn().mockImplementationOnce(() => {
      return document.createElement("canvas");
    });
  });

  it("should awake and update all children", () => {
    const spyNodeAwake = jest.spyOn(Tile.prototype, "awake");
    const spyNodeUpdate = jest.spyOn(Tile.prototype, "update");

    expect(spyNodeAwake).not.toHaveBeenCalled();
    expect(spyNodeUpdate).not.toHaveBeenCalled();

    grid.awake();
    expect(spyNodeAwake).toHaveBeenCalledTimes(nodeCount);

    grid.update(0);
    expect(spyNodeUpdate).toHaveBeenCalledTimes(nodeCount);
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(
      GridOnClickComponent.prototype,
      "awake"
    );
    const spyDrawCompUpdate = jest.spyOn(
      GridOnClickComponent.prototype,
      "update"
    );

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    grid.awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    grid.update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });
});
