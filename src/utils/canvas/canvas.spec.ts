import { Canvas } from "./canvas";
import { Vector2D } from "@/utils";

describe(">>> Canvas", () => {
  const size = new Vector2D(100, 100);
  let canvas: Canvas;

  beforeEach(() => {
    canvas = new Canvas(size);
  });

  it("should create and append canvas element to body", () => {
    const createElmSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");

    expect(createElmSpy).not.toHaveBeenCalled();
    expect(appendChildSpy).not.toHaveBeenCalled();

    canvas.Awake();

    expect(createElmSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
  });

  describe(">> API", () => {
    beforeEach(() => {
      canvas.Awake();
    });

    it("should draw and fill the rect", () => {
      const start = new Vector2D(0, 0);
      const size = new Vector2D(10, 10);
      const color = "#ffff00";

      const beginPathSpy = jest.spyOn(canvas.Context, "beginPath");
      const rectSpy = jest.spyOn(canvas.Context, "rect");
      const fillSpy = jest.spyOn(canvas.Context, "fill");

      canvas.FillRect(start, size, color);

      expect(beginPathSpy).toHaveBeenCalled();
      expect(rectSpy).toHaveBeenCalledWith(start.x, start.y, size.x, size.y);
      expect(fillSpy).toHaveBeenCalled();
      expect(canvas.Context.fillStyle).toBe(color);
    });

    it("should clear the rect", () => {
      const start = new Vector2D(0, 0);
      const size = new Vector2D(10, 10);

      const spy = jest.spyOn(canvas.Context, "clearRect");
      expect(spy).not.toHaveBeenCalled();

      canvas.ClearRect(start, size);

      expect(spy).toHaveBeenCalledWith(start.x, start.y, size.x, size.y);
    });
  });
});
