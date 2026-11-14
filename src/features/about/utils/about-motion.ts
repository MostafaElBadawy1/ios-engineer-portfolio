import { getMotion } from "../../../lib/motion";

/**
 * About choreography: the statement lights up word by word with scroll,
 * the portrait unveils from the bottom, and list rules draw in as rows arrive.
 */
export function initAbout(): void {
  const section = document.querySelector<HTMLElement>("[data-about]");
  const { gsap, SplitText, reduced } = getMotion();
  if (!section || reduced) return;

  const statement = section.querySelector<HTMLElement>("[data-statement]");
  if (statement) {
    // aria "none": words stay real text for screen readers; no aria-label on a <p>.
    const split = SplitText.create(statement, { type: "words", aria: "none" });
    gsap.fromTo(
      split.words,
      { color: "#56697a" },
      {
        color: "#fdf0d5",
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: 0.5 },
      },
    );
  }

  const portrait = section.querySelector<HTMLElement>("[data-portrait]");
  const img = section.querySelector<HTMLElement>("[data-portrait-img]");
  if (portrait && img) {
    gsap
      .timeline({ scrollTrigger: { trigger: portrait, start: "top 85%", end: "top 30%", scrub: 0.8 } })
      .fromTo(img, { clipPath: "inset(100% 0% 0% 0% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", ease: "none" })
      .fromTo(img, { scale: 1.18 }, { scale: 1, ease: "none" }, 0);
  }

  section.querySelectorAll<HTMLElement>("[data-reveal-title]").forEach((title) => {
    const split = SplitText.create(title, { type: "chars", mask: "chars", aria: "auto" });
    gsap.from(split.chars, {
      yPercent: 110,
      duration: 1.1,
      stagger: 0.025,
      scrollTrigger: { trigger: title, start: "top 85%" },
    });
  });

  section.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
    gsap
      .timeline({ scrollTrigger: { trigger: row, start: "top 88%" } })
      .fromTo(row, { "--draw": 0 }, { "--draw": 1, duration: 1.2 })
      .from(row.children, { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.1);
  });

  section.querySelectorAll<HTMLElement>("[data-skill-group]").forEach((group) => {
    gsap.from(group.querySelectorAll("[data-skill]"), {
      y: 16,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.05,
      scrollTrigger: { trigger: group, start: "top 88%" },
    });
  });
}
