import { CanvasLayer } from "@/utils";
import { ActorDrawComponent, mockActorFactory } from "@/entities/actor";

describe(">>> Node Actor Component", () => {
  let comp: ActorDrawComponent;
  beforeEach(() => {
    comp = new ActorDrawComponent();
    comp.entity = mockActorFactory();
  });

  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Foreground, "ClearRect");
    expect(spy).not.toHaveBeenCalled();

    comp.awake();

    expect(spy).toHaveBeenCalled();
  });

  it("should cleanup and draw rect every frame", () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Foreground, "ClearRect");
    const spyFillRect = jest.spyOn(CanvasLayer.Foreground, "FillCircle");

    expect(spyClearRect).not.toHaveBeenCalled();
    expect(spyFillRect).not.toHaveBeenCalled();

    comp.update(0);

    expect(spyClearRect).toHaveBeenCalled();
    expect(spyFillRect).toHaveBeenCalled();
  });
});
