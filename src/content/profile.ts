import type { Profile } from "../types/profile";

const email = "contact@mostafaelbadawy.com";

/** Site copy about Mostafa. Every fact comes from his CV and brief. */
export const profile: Profile = {
  name: "Mostafa El-Badawy",
  title: "iOS Engineer",
  location: "Egypt",
  bio: "iOS engineer with 3 years building public-service apps for Egypt, from national electricity services to professional syndicates. Native Swift and UIKit at the core, with production React Native experience and now working with Kotlin Multiplatform.",
  statement:
    "I build the apps people use to pay a bill, reach their syndicate, or book a visit to a holy site. Native Swift and UIKit at the core, SwiftUI where it fits, and architecture that keeps a big app easy to change.",
  email,
  links: {
    cv: { label: "Download CV", href: "/cv.pdf", external: false },
    github: { label: "GitHub", href: "https://github.com/MostafaElBadawy1", external: true },
    linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/mostafa-elbadawy", external: true },
    whatsapp: { label: "+20 155 396 8819", href: "https://wa.me/201553968819", external: true },
    email: { label: email, href: `mailto:${email}`, external: false },
  },
  experience: [
    {
      role: "iOS Engineer",
      organization: "Fixed Solutions",
      period: "Aug 2023 – Present",
      detail:
        "Public-service apps for Egypt and Saudi Arabia: Electricity Services, Visitors, Study in Egypt, Alharamain, and Act Plus.",
    },
    {
      role: "iOS Engineer, freelance",
      organization: "Independent",
      period: "Part-time",
      detail: "Production features for Bzaaarz, a Kuwaiti e-commerce app, and Medjol, a doctor booking app.",
    },
    {
      role: "iOS track, Intensive Code Camp",
      organization: "Information Technology Institute (ITI)",
      period: "Training",
      detail: "Intensive iOS software development programme.",
    },
  ],
  skills: [
    { name: "iOS", items: ["Swift", "SwiftUI", "UIKit", "Combine", "RxSwift"] },
    { name: "Cross-platform", items: ["React Native", "Kotlin Multiplatform"] },
    { name: "Architecture", items: ["Clean Architecture", "MVVM", "Modularization", "SOLID", "Unit testing"] },
    { name: "Tools", items: ["Git and Gitflow", "CI/CD", "Firebase", "Alamofire"] },
    {
      name: "AI tools and models",
      items: ["Claude Code", "Codex", "Gemini CLI", "OpenCode", "GLM", "DeepSeek", "Kimi", "Qwen"],
    },
  ],
  education: { degree: "B.Eng. Mechatronics", school: "Mansoura University", year: "2020" },
};
