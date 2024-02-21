import { lerp } from ".";

describe(">>> Lerp", () => {
  it("should linearly interpolate between two values", () => {
    expect(lerp(0, 50, 0.5)).toBe(25);
    expect(lerp(20, 80, 0)).toBe(20);
  });
});
