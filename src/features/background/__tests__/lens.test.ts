import { describe, expect, it } from "vitest";
import { damp, gridLines, lensGlow, lensOffset } from "../utils/lens";

const lens = { cx: 100, cy: 100, radius: 50, strength: 20 };

describe("lensOffset", () => {
  it("pushes a point to the right of the centre further right", () => {
    const { dx, dy } = lensOffset(110, 100, lens);
    expect(dx).toBeGreaterThan(0);
    expect(dy).toBeCloseTo(0);
  });

  it("peaks at strength when the point is radius/sqrt(2) away, and fades far away", () => {
    const peak = lensOffset(100 + 50 / Math.SQRT2, 100, lens).dx;
    expect(peak).toBeCloseTo(20, 5);
    expect(Math.abs(lensOffset(400, 100, lens).dx)).toBeLessThan(0.001);
  });

  it("is zero at the centre and continuous through it (no kink)", () => {
    expect(lensOffset(100, 100, lens)).toEqual({ dx: 0, dy: 0 });
    const left = lensOffset(99.9, 100, lens).dx;
    const right = lensOffset(100.1, 100, lens).dx;
    expect(Math.abs(right - left)).toBeLessThan(0.2);
  });

  it("returns zero when the lens is switched off or has no radius", () => {
    expect(lensOffset(120, 100, { ...lens, strength: 0 })).toEqual({ dx: 0, dy: 0 });
    expect(lensOffset(120, 100, { ...lens, radius: 0 })).toEqual({ dx: 0, dy: 0 });
  });
});

describe("lensGlow", () => {
  it("is 1 at the centre and decreases with distance", () => {
    expect(lensGlow(100, 100, lens)).toBe(1);
    expect(lensGlow(150, 100, lens)).toBeLessThan(lensGlow(120, 100, lens));
  });

  it("is 0 for a lens with no radius", () => {
    expect(lensGlow(100, 100, { ...lens, radius: 0 })).toBe(0);
  });
});

describe("damp", () => {
  it("moves toward the target without overshooting", () => {
    const next = damp(0, 100, 0.2, 16.7);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(100);
  });

  it("covers more distance on a longer frame", () => {
    expect(damp(0, 100, 0.2, 33.4)).toBeGreaterThan(damp(0, 100, 0.2, 16.7));
  });

  it("clamps rates outside 0..1", () => {
    expect(damp(0, 100, 5, 16.7)).toBeCloseTo(100);
    expect(damp(0, 100, -1, 16.7)).toBe(0);
  });
});

describe("gridLines", () => {
  it("covers the full length with overscan on both sides", () => {
    const lines = gridLines(200, 50, 0);
    expect(lines[0]).toBeLessThanOrEqual(0);
    expect(lines.at(-1)).toBeGreaterThanOrEqual(200);
  });

  it("wraps negative scroll offsets into one cell", () => {
    const lines = gridLines(100, 40, -130);
    expect(lines[0]).toBeGreaterThanOrEqual(-40);
    expect(lines[0]).toBeLessThan(0);
  });

  it("returns nothing for an empty axis or a zero cell", () => {
    expect(gridLines(0, 40, 0)).toEqual([]);
    expect(gridLines(100, 0, 0)).toEqual([]);
  });
});
