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
    const node = comp.entity.nodes[0];
    comp.clickOn(Vector2D.sub(node.end, new Vector2D(1, 1)));
    expect(node.isActive).toBeTruthy();
    expect(comp.entity.nodes[1].isActive).toBeFalsy();
  });
});
