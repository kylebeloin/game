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

  it("should update node if clicked within its range", () => {
    comp.clickOn(new Vector2D(100, 100));
    expect(comp.entity.nodes[0].isActive).toBeTruthy();
    expect(comp.entity.nodes[1].isActive).toBeFalsy();
  });
});
