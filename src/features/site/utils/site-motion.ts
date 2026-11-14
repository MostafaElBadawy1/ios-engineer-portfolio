import { getMotion } from "../../../lib/motion";

/** Lighting per scene: where the steel and crimson lights sit, and how strong. */
type Lights = Record<string, string | number>;
const hero: Lights = {
  "--steel-x": "18%",
  "--steel-y": "0%",
  "--steel-a": 0.1,
  "--crimson-x": "86%",
  "--crimson-y": "100%",
  "--crimson-a": 0.16,
};
const scenes: Record<string, Lights> = {
  about: {
    "--steel-x": "82%",
    "--steel-y": "18%",
    "--steel-a": 0.08,
    "--crimson-x": "8%",
    "--crimson-y": "96%",
    "--crimson-a": 0.07,
  },
  work: {
    "--steel-x": "70%",
    "--steel-y": "50%",
    "--steel-a": 0.09,
    "--crimson-x": "20%",
    "--crimson-y": "110%",
    "--crimson-a": 0.1,
  },
  contact: {
    "--steel-x": "15%",
    "--steel-y": "-10%",
    "--steel-a": 0.05,
    "--crimson-x": "50%",
    "--crimson-y": "105%",
    "--crimson-a": 0.24,
  },
};

/**
 * Page-level motion: the header turns solid after the hero, the nav marks the
 * section in view, and the background lighting crossfades between scenes.
 */
export function initSite(): void {
  const { gsap, ScrollTrigger, reduced } = getMotion();
  const header = document.querySelector<HTMLElement>("[data-header]");
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav]")];
  const atmosphere = document.querySelector<HTMLElement>("[data-atmosphere]");

  ScrollTrigger.create({
    start: () => innerHeight * 0.8,
    end: "max",
    onToggle: (self) => header?.toggleAttribute("data-solid", self.isActive),
  });

  let previous = hero;
  document.querySelectorAll<HTMLElement>("[data-scene]").forEach((section) => {
    const scene = section.dataset.scene ?? "";
    const link = navLinks.find((a) => a.dataset.nav === scene);
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) navLinks.forEach((a) => a.toggleAttribute("aria-current", a === link));
        else link?.removeAttribute("aria-current");
      },
    });
    const lights = scenes[scene];
    if (atmosphere && lights && !reduced) {
      // fromTo with the previous scene keeps lighting correct even after anchor jumps.
      gsap.fromTo(
        atmosphere,
        { ...previous },
        {
          ...lights,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 1 },
        },
      );
      previous = lights;
    }
  });
}
