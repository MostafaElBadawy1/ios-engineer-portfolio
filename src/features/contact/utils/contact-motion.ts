import { getMotion } from "../../../lib/motion";
import { LENS_EVENT, type LensTarget } from "../../background/utils/grid-controller";

/**
 * Finale: the question rises, the address types in, the background grid bends
 * toward the email, and an iOS home indicator draws in to close the page.
 */
export function initContact(): void {
  const section = document.querySelector<HTMLElement>("[data-contact]");
  const email = section?.querySelector<HTMLElement>("[data-email]");
  if (!section || !email) return;
  const { gsap, ScrollTrigger, SplitText, reduced } = getMotion();
  if (reduced) return;

  const pull = (): void => {
    const r = email.getBoundingClientRect();
    const target: LensTarget = { x: r.left + Math.min(r.width, innerWidth) / 2, y: r.top + r.height / 2, strength: 46 };
    dispatchEvent(new CustomEvent<LensTarget>(LENS_EVENT, { detail: target }));
  };
  const release = (): void => {
    dispatchEvent(new CustomEvent<LensTarget | null>(LENS_EVENT, { detail: null }));
  };
  ScrollTrigger.create({
    trigger: email,
    start: "top 75%",
    end: "bottom 15%",
    onEnter: pull,
    onEnterBack: pull,
    onUpdate: (self) => {
      if (self.isActive) pull();
    },
    onLeave: release,
    onLeaveBack: release,
  });

  const title = section.querySelector<HTMLElement>("[data-contact-title]");
  const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 60%" } });
  if (title) {
    const split = SplitText.create(title, {
      type: "words",
      mask: "words",
      aria: "auto",
      charsClass: "split-char",
      wordsClass: "split-word",
    });
    tl.from(split.words, { yPercent: 110, duration: 1.2, stagger: 0.05 });
  }
  const chars = SplitText.create(email, { type: "chars", aria: "auto" }).chars;
  tl.from(section.querySelectorAll("[data-contact-item]"), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.2).from(
    chars,
    { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.022, ease: "power2.out" },
    0.35,
  );

  gsap.from(section.querySelector("[data-indicator]"), {
    scaleX: 0,
    autoAlpha: 0,
    duration: 1.4,
    scrollTrigger: { trigger: section.querySelector("footer"), start: "top bottom" },
  });
}
