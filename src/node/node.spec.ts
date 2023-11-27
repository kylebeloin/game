import { Node } from "./node";
import { NodeDrawComponent } from "./components";

describe(">>> Node", () => {
  let node: Node;

  beforeEach(() => {
    node = new Node();
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, "Awake");
    const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, "Update");

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    node.Awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    node.Update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });
});
