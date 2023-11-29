import { CanvasLayer } from "./canvas-layer";
import { Canvas } from "@/utils";

jest.mock("@/utils");
describe(">>> CanvasLayer", () => {
  it("should create canvas only once", () => {
    expect(Canvas).not.toHaveBeenCalled();

    const canvas1 = CanvasLayer.Background;
    const canvas2 = CanvasLayer.Background;

    expect(canvas1).toBe(canvas2);
    expect(Canvas).toHaveBeenCalledTimes(1);
  });
});
