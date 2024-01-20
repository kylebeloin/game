import { NodeDrawComponent } from "./draw";
import { CanvasLayer } from "@/utils";
import { Settings } from "@/settings";

import { mockNodeFactory } from "@/entities/node";

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

  it("should render active color if entity is active and regular color otherwise", () => {
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "FillRect");

    comp.Entity.IsActive = true;
    comp.Update(0);
    expect(spyFillRect).toHaveBeenCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.active
    );

    comp.Entity.IsActive = false;
    comp.Update(0);
    expect(spyFillRect).toHaveBeenCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.default
    );
  });
});
