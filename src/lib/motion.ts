import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/** The GSAP toolkit every feature animates with. */
export interface Motion {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  SplitText: typeof SplitText;
  /** True when the visitor asked the OS for reduced motion. */
  reduced: boolean;
}

let instance: Motion | null = null;

/**
 * Facade over GSAP: registers plugins once and exposes the reduced-motion flag,
 * so features never touch plugin setup or media queries themselves.
 */
export function getMotion(): Motion {
  if (instance) return instance;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1 });
  instance = {
    gsap,
    ScrollTrigger,
    SplitText,
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
  return instance;
}

/**
 * Runs below-the-fold setup once the main thread is free, so the first paint
 * and the hero intro never wait on it. Falls back to a short timeout.
 */
export function whenIdle(task: () => void): void {
  if ("requestIdleCallback" in window) requestIdleCallback(() => task(), { timeout: 1200 });
  else setTimeout(task, 200);
}

/** Reveals intro content hidden by the head script once animations are set up. */
export function releaseIntro(): void {
  document.documentElement.classList.remove("motion-pending");
}
