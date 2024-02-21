import { Tile } from "./tile";
import { TileDrawComponent } from "./components";
import { Vector2D } from "@/utils";

describe(">>> Tile", () => {
  const start = new Vector2D(1, 2);
  const end = new Vector2D(5, 6);
  const index = new Vector2D(1, 1);
  let tile: Tile;

  beforeEach(() => {
    tile = new Tile(start, end, index, []);
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(TileDrawComponent.prototype, "awake");
    const spyDrawCompUpdate = jest.spyOn(TileDrawComponent.prototype, "update");

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    tile.awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    tile.update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });

  it("should calculate size", () => {
    expect(tile.size.x).toBe<number>(end.x - start.x);
    expect(tile.size.y).toBe<number>(end.y - start.y);
  });

  it("should check if provided point is within occupied area", () => {
    expect(tile.occupies(new Vector2D(3, 2))).toBeTruthy();
    expect(tile.occupies(new Vector2D(6, 2))).toBeFalsy();
    expect(tile.occupies(new Vector2D(3, 7))).toBeFalsy();
  });
});
