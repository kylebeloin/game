import { GridOnClickComponent } from "./onclick";
import { mockGridFactory } from "@/entities/grid";
import { Vector2D } from "@/utils";

describe(">>> Grid Click Component", () => {
  let comp: GridOnClickComponent;

  beforeEach(() => {
    comp = new GridOnClickComponent();
    comp.entity = mockGridFactory();
    comp.entity.awake();
  });

  it("should update tile if clicked within its range", () => {
    const tile = comp.entity.tiles[0];
    comp.clickOn(Vector2D.sub(tile.end, new Vector2D(1, 1)));
    expect(tile.isActive).toBeTruthy();
    expect(comp.entity.tiles[1].isActive).toBeFalsy();
  });
});
