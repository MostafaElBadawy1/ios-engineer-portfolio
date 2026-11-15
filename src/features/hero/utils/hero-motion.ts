import { getMotion, releaseIntro } from "../../../lib/motion";
import { formatLocalTime } from "./local-time";

/**
 * Hero choreography: the name rises out of masked lines on load, then the two
 * lines drift apart and fade as the visitor scrolls into the story.
 */
export function initHero(): void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const time = document.querySelector<HTMLTimeElement>("[data-cairo-time]");
  if (time) time.textContent = formatLocalTime(new Date(), "Africa/Cairo");
  if (!hero) return;

  const { gsap, SplitText, reduced } = getMotion();
  if (reduced) {
    releaseIntro();
    return;
  }

  const name = hero.querySelector<HTMLElement>("[data-hero-name]");
  const lines = hero.querySelectorAll<HTMLElement>("[data-hero-line]");
  const rest = hero.querySelectorAll<HTMLElement>("[data-hero-meta] > [data-intro], [data-scroll-cue]");
  if (!name) return;

  const split = SplitText.create(name, {
    type: "words,chars",
    mask: "chars",
    aria: "auto",
    charsClass: "split-char",
    wordsClass: "split-word",
  });
  gsap.set([name, ...rest], { visibility: "visible" });
  releaseIntro();

  gsap
    .timeline({ delay: 0.15 })
    .from(split.chars, { yPercent: 115, duration: 1.4, stagger: 0.035 })
    .from(rest, { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, "-=0.95");

  const scroll = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 };
  gsap.to(lines[0] ?? [], { xPercent: -6, ease: "none", scrollTrigger: scroll });
  gsap.to(lines[1] ?? [], { xPercent: 6, ease: "none", scrollTrigger: scroll });
  gsap.to(name, { yPercent: -18, autoAlpha: 0.12, ease: "none", scrollTrigger: scroll });
  gsap.to(hero.querySelector("[data-scroll-cue]"), {
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "15% top", scrub: true },
  });
}
