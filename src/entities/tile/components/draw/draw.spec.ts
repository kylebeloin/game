import { TileDrawComponent } from "./draw";
import { CanvasLayer } from "@/utils";
import { Settings } from "@/settings";

import { mockTileFactory } from "@/entities/tile";

describe(">>> Node Draw Component", () => {
  let comp: TileDrawComponent;
  beforeEach(() => {
    comp = new TileDrawComponent();
    comp.entity = mockTileFactory();
  });

  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Background, "clearRect");
    expect(spy).not.toHaveBeenCalled();

    comp.awake();

    expect(spy).toHaveBeenCalled();
  });

  it("should cleanup and draw rect every frame", () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Background, "clearRect");
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "fillRect");

    expect(spyClearRect).not.toHaveBeenCalled();
    expect(spyFillRect).not.toHaveBeenCalled();

    comp.update(0);

    expect(spyClearRect).toHaveBeenCalled();
    expect(spyFillRect).toHaveBeenCalled();
  });

  it("should render active color if entity is active and regular color otherwise", () => {
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "fillRect");

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
