import { gridLines, lensGlow, lensOffset, type LensConfig } from "./lens";

/** Visual constants for the grid; tuned per viewport by the controller. */
export interface GridStyle {
  cell: number;
  /** Polyline step: smaller bends more smoothly, costs more. */
  step: number;
  baseColor: string;
  glowColor: string;
  glowAlpha: number;
}

/**
 * Renderer pattern: draws a fine line grid that bends around a lens.
 * Owns no timing or input; the controller feeds it state each frame.
 */
export class GridRenderer {
  private width = 0;
  private height = 0;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly style: GridStyle,
  ) {}

  /** Matches the backing store to the CSS size at the given pixel ratio. */
  resize(width: number, height: number, dpr: number): void {
    this.width = width;
    this.height = height;
    const canvas = this.ctx.canvas;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /** Draws one frame. `scrollOffset` shifts the grid for parallax. */
  draw(lens: LensConfig, scrollOffset: number): void {
    const { ctx, width, height, style } = this;
    ctx.clearRect(0, 0, width, height);
    const xs = gridLines(width, style.cell, 0);
    const ys = gridLines(height, style.cell, scrollOffset);

    ctx.lineWidth = 1;
    ctx.strokeStyle = style.baseColor;
    ctx.beginPath();
    for (const x of xs) this.trace(x, true, lens, 0, height);
    for (const y of ys) this.trace(y, false, lens, 0, width);
    ctx.stroke();

    if (lens.strength > 0.5) this.drawGlow(xs, ys, lens);
  }

  /** Adds one bent line to the current path, from `from` to `to` along its axis. */
  private trace(fixed: number, vertical: boolean, lens: LensConfig, from: number, to: number): void {
    const { ctx, style } = this;
    for (let t = from - style.step; t <= to + style.step; t += style.step) {
      const px = vertical ? fixed : t;
      const py = vertical ? t : fixed;
      const { dx, dy } = lensOffset(px, py, lens);
      if (t === from - style.step) ctx.moveTo(px + dx, py + dy);
      else ctx.lineTo(px + dx, py + dy);
    }
  }

  /** Re-strokes only the segments near the lens in the highlight colour. */
  private drawGlow(xs: number[], ys: number[], lens: LensConfig): void {
    const { ctx, style } = this;
    const reach = lens.radius * 2.2;
    ctx.strokeStyle = style.glowColor;
    const segment = (ax: number, ay: number, bx: number, by: number): void => {
      const glow = lensGlow((ax + bx) / 2, (ay + by) / 2, lens);
      if (glow < 0.02) return;
      const a = lensOffset(ax, ay, lens);
      const b = lensOffset(bx, by, lens);
      ctx.globalAlpha = glow * style.glowAlpha;
      ctx.beginPath();
      ctx.moveTo(ax + a.dx, ay + a.dy);
      ctx.lineTo(bx + b.dx, by + b.dy);
      ctx.stroke();
    };
    for (const x of xs) {
      if (Math.abs(x - lens.cx) > reach) continue;
      for (let y = lens.cy - reach; y < lens.cy + reach; y += style.step) segment(x, y, x, y + style.step);
    }
    for (const y of ys) {
      if (Math.abs(y - lens.cy) > reach) continue;
      for (let x = lens.cx - reach; x < lens.cx + reach; x += style.step) segment(x, y, x + style.step, y);
    }
    ctx.globalAlpha = 1;
  }
}
