import { add } from "../utils/add";

describe("add function", () => {
  it("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("adds positive and negative numbers", () => {
    expect(add(2, -3)).toBe(-1);
  });

  it("adds two negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
