import { Canvas } from "./canvas";
import { Vector2D, Color } from "@/utils";

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
      const color = new Color(255, 255, 255, 1);

      const beginPathSpy = jest.spyOn(canvas.Context, "beginPath");
      const rectSpy = jest.spyOn(canvas.Context, "rect");
      const fillSpy = jest.spyOn(canvas.Context, "fill");

      canvas.FillRect(start, size, color);

      const canvasColor = Color.FromHex(canvas.Context.fillStyle.toString());

      expect(beginPathSpy).toHaveBeenCalled();
      expect(rectSpy).toHaveBeenCalledWith(start.x, start.y, size.x, size.y);
      expect(fillSpy).toHaveBeenCalled();
      expect(canvasColor.AsString() === color.AsString()).toBeTruthy();
    });

    it("should clear the rect", () => {
      const start = new Vector2D(0, 0);
      const size = new Vector2D(10, 10);

      const spy = jest.spyOn(canvas.Context, "clearRect");
      expect(spy).not.toHaveBeenCalled();

      canvas.ClearRect(start, size);

      expect(spy).toHaveBeenCalledWith(start.x, start.y, size.x, size.y);
    });

    it("should draw and fill the circle", () => {
      const center = new Vector2D(0, 0);
      const radius = 10;
      const color = new Color(255, 255, 255, 1);

      const beginPathSpy = jest.spyOn(canvas.Context, "beginPath");
      const arcSpy = jest.spyOn(canvas.Context, "arc");
      const fillSpy = jest.spyOn(canvas.Context, "fill");

      canvas.FillCircle(center, radius, color);

      const canvasColor = Color.FromHex(canvas.Context.fillStyle.toString());

      expect(beginPathSpy).toHaveBeenCalled();
      expect(arcSpy).toHaveBeenCalledWith(
        center.x,
        center.y,
        radius,
        0,
        Math.PI * 2
      );
      expect(fillSpy).toHaveBeenCalled();
      expect(canvasColor.AsString() === color.AsString()).toBeTruthy();
    });

    it("should set css style", () => {
      const zIndex = "1";
      expect(canvas.Element.style.zIndex).not.toBe<string>(zIndex);

      canvas.SetStyle({ zIndex });

      expect(canvas.Element.style.zIndex).toBe<string>(zIndex);
    });

    it("should draw the text", () => {
      const text = "text";
      const position = new Vector2D(0, 0);
      const color = new Color(255, 10, 20, 1);
      // --- ADD --- //

      const spy = jest.spyOn(canvas.Context, "fillText");

      expect(spy).not.toHaveBeenCalled();

      // --- ADD --- //
      canvas.DrawText(text, position, color);

      expect(spy).toHaveBeenCalledWith(text, position.x, position.y);
    });

    describe(">>> calculate local point by global", () => {
      beforeEach(() => {
        canvas.Element.getBoundingClientRect = jest.fn().mockReturnValue({
          top: 20,
          left: 20,
          width: 500,
          height: 500,
        });
      });

      it("should return null if point is out of canvas boundaries", () => {
        expect(canvas.CalcLocalPointFrom(new Vector2D(0, 0))).toBeNull();
        expect(canvas.CalcLocalPointFrom(new Vector2D(541, 400))).toBeNull();
        expect(canvas.CalcLocalPointFrom(new Vector2D(400, 541))).toBeNull();
      });

      it("should return local point otherwise", () => {
        expect(canvas.CalcLocalPointFrom(new Vector2D(200, 300))).toEqual(
          new Vector2D(180, 280)
        );
      });
    });
  });
});
