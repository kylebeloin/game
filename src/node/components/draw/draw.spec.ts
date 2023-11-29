import { NodeDrawComponent } from "./draw";
import { CanvasLayer } from "@/utils";

import { mockNodeFactory } from "@/node";

describe(">>> Node Draw Component", () => {
  let comp: NodeDrawComponent;
  beforeEach(() => {
    comp = new NodeDrawComponent();
    comp.Entity = mockNodeFactory();
  });

  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Background, "ClearRect");
    expect(spy).not.toHaveBeenCalled();

    comp.Awake();

    expect(spy).toHaveBeenCalled();
  });

  it("should cleanup and draw rect every frame", () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Background, "ClearRect");
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "FillRect");

    expect(spyClearRect).not.toHaveBeenCalled();
    expect(spyFillRect).not.toHaveBeenCalled();

    comp.Update(0);

    expect(spyClearRect).toHaveBeenCalled();
    expect(spyFillRect).toHaveBeenCalled();
  });
});
