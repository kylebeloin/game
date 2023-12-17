import { CanvasLayer } from "@/utils";
import { ActorDrawComponent, mockActorFactory } from "@/actor";

describe(">>> Node Actor Component", () => {
  let comp: ActorDrawComponent;
  beforeEach(() => {
    comp = new ActorDrawComponent();
    comp.Entity = mockActorFactory();
  });

  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Foreground, "ClearRect");
    expect(spy).not.toBeCalled();

    comp.Awake();

    expect(spy).toBeCalled();
  });

  it("should cleanup and draw rect every frame", () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Foreground, "ClearRect");
    const spyFillRect = jest.spyOn(CanvasLayer.Foreground, "FillCircle");

    expect(spyClearRect).not.toBeCalled();
    expect(spyFillRect).not.toBeCalled();

    comp.Update(0);

    expect(spyClearRect).toBeCalled();
    expect(spyFillRect).toBeCalled();
  });
});
