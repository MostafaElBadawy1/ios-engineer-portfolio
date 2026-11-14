/** A 2D displacement in CSS pixels. */
export interface Offset {
  dx: number;
  dy: number;
}

/** Parameters of the cursor lens that bends the grid. */
export interface LensConfig {
  /** Lens centre, CSS pixels. */
  cx: number;
  cy: number;
  /** Radius where the bend falls to ~37% of its peak. */
  radius: number;
  /** Peak displacement in pixels; 0 disables the lens. */
  strength: number;
}

/** exp(-1/2) * sqrt(2): scales the bulge so its peak push equals `strength`. */
const PEAK_NORMALIZER = Math.SQRT2 * Math.exp(0.5);

/**
 * Pushes a grid point away from the lens centre like a magnifier. The push grows
 * linearly from the centre and fades with a Gaussian, so lines stay smooth
 * (no kink) even when they pass straight through the lens.
 * @returns the displacement to add to the point; peaks at radius/sqrt(2).
 */
export function lensOffset(px: number, py: number, lens: LensConfig): Offset {
  if (lens.strength === 0 || lens.radius <= 0) return { dx: 0, dy: 0 };
  const x = (px - lens.cx) / lens.radius;
  const y = (py - lens.cy) / lens.radius;
  const scale = lens.strength * PEAK_NORMALIZER * Math.exp(-(x * x + y * y));
  return { dx: x * scale, dy: y * scale };
}

/**
 * Brightness boost for a grid point near the lens, 0..1.
 * @returns 1 at the centre, fading with the same Gaussian as the bend.
 */
export function lensGlow(px: number, py: number, lens: LensConfig): number {
  if (lens.radius <= 0) return 0;
  const distance = Math.hypot(px - lens.cx, py - lens.cy);
  return Math.exp(-((distance / (lens.radius * 1.4)) ** 2));
}

/**
 * Frame-rate-independent exponential smoothing toward a target.
 * @param rate fraction of the remaining distance covered per 16.7ms frame (0..1)
 * @param dtMs elapsed time since the last frame
 */
export function damp(current: number, target: number, rate: number, dtMs: number): number {
  const clamped = Math.min(Math.max(rate, 0), 1);
  const t = 1 - (1 - clamped) ** (dtMs / (1000 / 60));
  return current + (target - current) * t;
}

/**
 * Positions of grid lines along one axis, shifted by a scroll offset and
 * wrapped so lines always cover [0, length] with one line of overscan each side.
 */
export function gridLines(length: number, cell: number, offset: number): number[] {
  if (cell <= 0 || length <= 0) return [];
  const start = (((offset % cell) + cell) % cell) - cell;
  const lines: number[] = [];
  for (let p = start; p <= length + cell; p += cell) lines.push(p);
  return lines;
}
