// Shared preview content. Every fact is from the brief or the CV; nothing invented.
// Icons are placeholders until the real App Store artwork is supplied.
window.APPS = [
  {
    id: "visitors", name: "Visitors", alt: "Zaeroon", mono: "Zr",
    tint: "#FDF0D5", ink: "#071722",
    line: "Book visits to museums and religious sites across Saudi Arabia.",
    org: "Fixed Solutions", role: "iOS Engineer", region: "KSA",
    facts: [["200k+", "downloads"], ["7", "languages"], ["KSA", "market"]],
    work: [
      "Worked on the app that lets visitors book appointments at museums and religious sites.",
      "Supported localization for seven languages.",
    ],
    stack: ["MVVM", "UIKit", "SwiftUI"],
    store: "https://apps.apple.com/eg/app/id1543620330",
  },
  {
    id: "eehc", name: "Electricity", alt: "Egyptian Electricity Services", mono: "EE",
    tint: "#669BBC", ink: "#030A10",
    line: "Citizen, employee, and emergency apps for Egypt's national electricity services.",
    org: "Fixed Solutions", role: "iOS Engineer", region: "Egypt",
    facts: [["100k+", "downloads"], ["3", "apps"], ["Retired", "version"]],
    work: [
      "Built the authentication flow, profile, dynamic forms, and sort and filter for requests.",
      "Contributed to the UI refactor from UIKit to SwiftUI.",
    ],
    stack: ["SwiftUI", "MVVM", "Modularization"],
    store: null, status: "Retired version. Screenshots only, no store link.",
  },
  {
    id: "actplus", name: "Act Plus", alt: "Actors Syndicate", mono: "A+",
    tint: "#780000", ink: "#FDF0D5",
    line: "Official app of the Egyptian Syndicate of Performing Arts Professions.",
    org: "Fixed Solutions", role: "iOS Engineer", region: "Egypt",
    facts: [["News", "for artists"], ["Directory", "of members"], ["Egypt", "market"]],
    work: [
      "Artist news, a member directory, contacting members, and syndicate projects and activities.",
    ],
    stack: [],
    store: "https://apps.apple.com/eg/app/act-plus/id6447485378",
  },
  {
    id: "alharamain", name: "Alharamain", alt: "Grand Mosque services", mono: "Hr",
    tint: "#0E2A3D", ink: "#FDF0D5",
    line: "Services for visitors on their journey at the Grand Mosque, Mecca.",
    org: "Fixed Solutions", role: "iOS Engineer", region: "KSA",
    facts: [["Mecca", "KSA"]],
    work: ["Worked on the iOS app serving visitors to the Grand Mosque."],
    stack: [],
    store: "https://apps.apple.com/eg/app/id1115020295",
  },
  {
    id: "bzaaarz", name: "Bzaaarz", alt: "E-commerce, Kuwait", mono: "Bz",
    tint: "#C1121F", ink: "#FDF0D5",
    line: "Kuwaiti e-commerce app.",
    org: "Freelance", role: "iOS Engineer", region: "Kuwait",
    facts: [["Kuwait", "market"], ["Freelance", "engagement"]],
    work: [
      "Core screens and features in a production e-commerce app.",
      "MVVM with Combine for reactive data flow and state.",
    ],
    stack: ["UIKit", "MVVM", "Combine"],
    store: "https://apps.apple.com/eg/app/bzaaarz/id6448076974",
  },
  {
    id: "medjol", name: "Medjol", alt: "Doctor booking", mono: "Md",
    tint: "#12384F", ink: "#A4B6C1",
    line: "Search for doctors and book appointments.",
    org: "Freelance", role: "iOS Engineer", region: "",
    facts: [["Health", "category"], ["Freelance", "engagement"]],
    work: [
      "Developed and maintained key features for search and booking.",
      "MVVM with RxSwift for reactive bindings.",
    ],
    stack: ["UIKit", "MVVM", "RxSwift"],
    store: "https://apps.apple.com/eg/app/medjol/id6648327270",
  },
];

// Renders a placeholder icon element (shared by all directions).
window.iconHTML = (app, size) =>
  `<span class="icon" data-placeholder style="--size:${size}px;--tint:${app.tint};--ink:${app.ink}" aria-hidden="true">${app.mono}</span>`;

// Fills any element tree that uses data-f="field" hooks with an app's content.
window.fillDetail = (root, app, iconSize) => {
  const set = (k, v) => root.querySelectorAll(`[data-f="${k}"]`).forEach((n) => (n.innerHTML = v));
  set("icon", iconHTML(app, iconSize));
  set("name", app.name);
  set("alt", app.alt);
  set("line", app.line);
  set("meta", [app.role, app.org, app.region].filter(Boolean).join(" · "));
  set("facts", app.facts.map(([v, l]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join(""));
  set("work", app.work.map((w) => `<li>${w}</li>`).join(""));
  set("stack", app.stack.length ? app.stack.map((s) => `<li>${s}</li>`).join("") : "<li class=\"none\">Stack details to confirm</li>");
  set("cta", app.store
    ? `<a class="btn" href="${app.store}" rel="noopener" target="_blank">View on the App Store</a>`
    : `<p class="status">${app.status}</p>`);
};
