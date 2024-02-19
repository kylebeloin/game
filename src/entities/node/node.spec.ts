import { Node } from "./node";
import { NodeDrawComponent } from "./components";
import { Vector2D } from "@/utils";

describe(">>> Node", () => {
  const start = new Vector2D(1, 2);
  const end = new Vector2D(5, 6);
  const index = new Vector2D(1, 1);
  let node: Node;

  beforeEach(() => {
    node = new Node(start, end, index);
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, "awake");
    const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, "update");

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    node.awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    node.update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });

  it("should calculate size", () => {
    expect(node.size.x).toBe<number>(end.x - start.x);
    expect(node.size.y).toBe<number>(end.y - start.y);
  });

  it("should check if provided point is within occupied area", () => {
    expect(node.occupies(new Vector2D(3, 2))).toBeTruthy();
    expect(node.occupies(new Vector2D(6, 2))).toBeFalsy();
    expect(node.occupies(new Vector2D(3, 7))).toBeFalsy();
  });
});
