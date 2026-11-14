import { getMotion } from "../../../lib/motion";

type Gsap = ReturnType<typeof getMotion>["gsap"];

/**
 * Selected-work choreography. On desktop one phone stays pinned while chapters scroll:
 * entering a chapter launches that app from its home-screen icon (iOS zoom), leaving
 * closes it back into the icon. On small screens each chapter's own phone rises in.
 */
export function initWork(): void {
  const section = document.querySelector<HTMLElement>("[data-work]");
  if (!section) return;
  const { gsap, ScrollTrigger, SplitText, reduced } = getMotion();
  const chapters = [...section.querySelectorAll<HTMLElement>("[data-chapter]")];
  const launcher = createLauncher(section, gsap, reduced);

  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (self.isActive) launcher.show(chapter.dataset.chapter ?? null);
      },
    });
  });
  if (chapters[0]) {
    ScrollTrigger.create({ trigger: chapters[0], start: "top 55%", onLeaveBack: () => launcher.show(null) });
  }
  if (reduced) return;

  const title = section.querySelector<HTMLElement>("[data-work-title]");
  if (title) {
    const split = SplitText.create(title, { type: "chars", mask: "chars", aria: "auto" });
    gsap.from(split.chars, { yPercent: 110, duration: 1.2, stagger: 0.03, scrollTrigger: { trigger: title, start: "top 85%" } });
    gsap.from("[data-work-lede]", { y: 24, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: title, start: "top 80%" } });
  }

  const stage = section.querySelector<HTMLElement>("[data-phone-stage]");
  const story = section.querySelector<HTMLElement>(".work__story");
  if (stage && story) {
    gsap.fromTo(
      stage,
      { y: 160, rotateX: 18, rotateZ: -6 },
      {
        y: 0,
        rotateX: 0,
        rotateZ: -2,
        ease: "none",
        scrollTrigger: { trigger: story, start: "top bottom", end: "top 30%", scrub: 1 },
      },
    );
    gsap.fromTo(
      stage,
      { rotateZ: -2, rotateY: -8 },
      {
        rotateZ: 2,
        rotateY: 8,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: story, start: "top 30%", end: "bottom bottom", scrub: 1.2 },
      },
    );
  }

  chapters.forEach((chapter) => {
    const heading = chapter.querySelector<HTMLElement>("[data-chapter-title]");
    const items = chapter.querySelectorAll<HTMLElement>("[data-chapter-item]");
    const tl = gsap.timeline({ scrollTrigger: { trigger: chapter, start: "top 65%" } });
    if (heading) {
      const split = SplitText.create(heading, { type: "words", mask: "words", aria: "auto" });
      tl.from(split.words, { yPercent: 105, duration: 1.1, stagger: 0.06 });
    }
    tl.from(items, { y: 28, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.1);

    const inline = chapter.querySelector<HTMLElement>("[data-phone='single']");
    if (inline && getComputedStyle(inline.parentElement ?? inline).display !== "none") {
      gsap.fromTo(
        inline,
        { y: 80, rotateZ: 5, scale: 0.92 },
        {
          y: 0,
          rotateZ: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: chapter, start: "top bottom", end: "top 35%", scrub: 0.8 },
        },
      );
    }
  });
}

/** State machine for the pinned phone: home, or exactly one open app. */
function createLauncher(section: HTMLElement, gsap: Gsap, reduced: boolean): { show: (id: string | null) => void } {
  const screen = section.querySelector<HTMLElement>("[data-phone='stage'] [data-phone-screen]");
  const home = screen?.querySelector<HTMLElement>("[data-home]");
  const rail = [...section.querySelectorAll<HTMLAnchorElement>("[data-rail]")];
  let current: string | null = null;
  let timeline: gsap.core.Timeline | null = null;

  const appScreen = (id: string): HTMLElement | null => screen?.querySelector<HTMLElement>(`[data-app-screen="${id}"]`) ?? null;
  const origin = (id: string): string => {
    const icon = screen?.querySelector<HTMLElement>(`[data-home-icon="${id}"] .app-icon`);
    if (!screen || !icon) return "50% 50%";
    const s = screen.getBoundingClientRect();
    const i = icon.getBoundingClientRect();
    return `${((i.left + i.width / 2 - s.left) / s.width) * 100}% ${((i.top + i.height / 2 - s.top) / s.height) * 100}%`;
  };

  const show = (id: string | null): void => {
    if (id === current || !screen || !home) return;
    const previous = current;
    current = id;
    rail.forEach((link) => link.toggleAttribute("aria-current", link.dataset.rail === id));
    timeline?.progress(1).kill();

    const next = id ? appScreen(id) : null;
    const prev = previous ? appScreen(previous) : null;
    if (reduced) {
      gsap.set(screen.querySelectorAll("[data-app-screen]"), { autoAlpha: 0 });
      gsap.set(home, { autoAlpha: id ? 0 : 1 });
      if (next) gsap.set(next, { autoAlpha: 1, scale: 1 });
      return;
    }

    timeline = gsap.timeline();
    if (prev && previous) {
      timeline.to(prev, {
        scale: 0.16,
        autoAlpha: 0,
        borderRadius: "40%",
        transformOrigin: origin(previous),
        duration: 0.42,
        ease: "power3.in",
      });
    }
    timeline.to(home, { scale: id ? 1.08 : 1, autoAlpha: id ? 0 : 1, duration: 0.5, ease: "power2.out" }, prev ? "-=0.15" : 0);
    if (next && id) {
      timeline.fromTo(
        next,
        { scale: 0.16, autoAlpha: 0, borderRadius: "40%", transformOrigin: origin(id) },
        { scale: 1, autoAlpha: 1, borderRadius: "0%", duration: 0.75, ease: "expo.out" },
        prev ? ">-0.1" : 0.05,
      );
    }
  };

  return { show };
}
