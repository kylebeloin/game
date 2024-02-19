import { NodeDrawComponent } from "./draw";
import { CanvasLayer } from "@/utils";
import { Settings } from "@/settings";

import { mockNodeFactory } from "@/entities/node";

describe(">>> Node Draw Component", () => {
  let comp: NodeDrawComponent;
  beforeEach(() => {
    comp = new NodeDrawComponent();
    comp.entity = mockNodeFactory();
  });

  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Background, "ClearRect");
    expect(spy).not.toHaveBeenCalled();

    comp.awake();

    expect(spy).toHaveBeenCalled();
  });

  it("should cleanup and draw rect every frame", () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Background, "ClearRect");
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "FillRect");

    expect(spyClearRect).not.toHaveBeenCalled();
    expect(spyFillRect).not.toHaveBeenCalled();

    comp.update(0);

    expect(spyClearRect).toHaveBeenCalled();
    expect(spyFillRect).toHaveBeenCalled();
  });

  it("should render active color if entity is active and regular color otherwise", () => {
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "FillRect");

    comp.entity.isActive = true;
    comp.update(0);
    expect(spyFillRect).toHaveBeenCalledWith(
      comp.entity.start,
      comp.entity.size,
      Settings.grid.color.active
    );

    comp.entity.isActive = false;
    comp.update(0);
    expect(spyFillRect).toHaveBeenCalledWith(
      comp.entity.start,
      comp.entity.size,
      Settings.grid.color.default
    );
  });
});
