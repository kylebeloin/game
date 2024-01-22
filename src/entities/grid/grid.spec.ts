import { GridOnClickComponent } from "./components";
import { Node, Grid } from "@/entities";
import { Settings } from "@/settings";

describe(">>> Grid", () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension;
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid();
  });

  it("should awake and update all children", () => {
    const spyNodeAwake = jest.spyOn(Node.prototype, "Awake");
    const spyNodeUpdate = jest.spyOn(Node.prototype, "Update");

    expect(spyNodeAwake).not.toHaveBeenCalled();
    expect(spyNodeUpdate).not.toHaveBeenCalled();

    grid.Awake();
    expect(spyNodeAwake).toHaveBeenCalledTimes(nodeCount);

    grid.Update(0);
    expect(spyNodeUpdate).toHaveBeenCalledTimes(nodeCount);
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(
      GridOnClickComponent.prototype,
      "Awake"
    );
    const spyDrawCompUpdate = jest.spyOn(
      GridOnClickComponent.prototype,
      "Update"
    );

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    grid.Awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    grid.Update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });
});
