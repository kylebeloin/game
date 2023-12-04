import { Ship, mockShipFactory, ShipDrawComponent } from "@/ship";

describe(">>> Ship", () => {
  let ship: Ship;

  beforeEach(() => {
    ship = mockShipFactory();
  });

  it("should awake and update all Components", () => {
    const spyDrawCompAwake = jest.spyOn(ShipDrawComponent.prototype, "Awake");
    const spyDrawCompUpdate = jest.spyOn(ShipDrawComponent.prototype, "Update");

    expect(spyDrawCompAwake).not.toHaveBeenCalled();
    expect(spyDrawCompUpdate).not.toHaveBeenCalled();

    ship.Awake();
    expect(spyDrawCompAwake).toHaveBeenCalled();

    ship.Update(0);
    expect(spyDrawCompUpdate).toHaveBeenCalled();
  });
});
