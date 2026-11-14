import { damp, type LensConfig } from "./lens";
import { GridRenderer, type GridStyle } from "./grid-renderer";

/** Where the lens should go: the pointer, or a page element the story points at. */
export interface LensTarget {
  x: number;
  y: number;
  strength: number;
}

/** Event a section dispatches to pull the lens to a point (or release it with `null`). */
export const LENS_EVENT = "grid:lens";

/**
 * Drives the grid: input, scroll parallax, and a render loop that sleeps when idle.
 * @returns a cleanup function that removes every listener.
 */
export function startGrid(canvas: HTMLCanvasElement, options: { reducedMotion: boolean; finePointer: boolean }): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  const style: GridStyle = {
    cell: 64,
    step: 12,
    baseColor: "rgb(253 240 213 / 0.055)",
    glowColor: "#669bbc",
    glowAlpha: 0.55,
  };
  const renderer = new GridRenderer(ctx, style);
  const lens: LensConfig = { cx: innerWidth / 2, cy: innerHeight * 0.4, radius: 190, strength: 0 };
  let pointer: LensTarget | null = null;
  let story: LensTarget | null = null;
  let scroll = scrollY;
  let frame = 0;
  let last = performance.now();

  const resize = (): void => {
    style.cell = innerWidth < 640 ? 44 : 64;
    lens.radius = innerWidth < 640 ? 120 : 190;
    renderer.resize(innerWidth, innerHeight, Math.min(devicePixelRatio || 1, 1.75));
    request();
  };

  const tick = (now: number): void => {
    const dt = Math.min(now - last, 64);
    last = now;
    const target = story ?? pointer;
    const rate = story ? 0.06 : 0.16;
    if (target) {
      lens.cx = damp(lens.cx, target.x, rate, dt);
      lens.cy = damp(lens.cy, target.y, rate, dt);
    }
    lens.strength = damp(lens.strength, target?.strength ?? 0, 0.08, dt);
    renderer.draw(lens, -scroll * 0.18);

    const settling = target ? Math.hypot(lens.cx - target.x, lens.cy - target.y) > 0.3 : lens.strength > 0.05;
    const easing = Math.abs(lens.strength - (target?.strength ?? 0)) > 0.05;
    frame = settling || easing ? requestAnimationFrame(tick) : 0;
  };

  const request = (): void => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const onPointer = (e: PointerEvent): void => {
    if (e.pointerType !== "mouse") return;
    pointer = { x: e.clientX, y: e.clientY, strength: 30 };
    request();
  };
  const onLeave = (): void => {
    pointer = null;
    request();
  };
  const onScroll = (): void => {
    scroll = scrollY;
    request();
  };
  const onStory = (e: Event): void => {
    const detail = (e as CustomEvent<LensTarget | null>).detail; // cast: LENS_EVENT always carries this payload
    story = options.reducedMotion ? null : detail;
    request();
  };

  addEventListener("resize", resize);
  if (!options.reducedMotion) {
    addEventListener("scroll", onScroll, { passive: true });
    if (options.finePointer) {
      addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    addEventListener(LENS_EVENT, onStory);
  }
  resize();

  return () => {
    cancelAnimationFrame(frame);
    removeEventListener("resize", resize);
    removeEventListener("scroll", onScroll);
    removeEventListener("pointermove", onPointer);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    removeEventListener(LENS_EVENT, onStory);
  };
}
