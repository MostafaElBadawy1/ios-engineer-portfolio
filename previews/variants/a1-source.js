// A1: renders real SwiftUI for this screen and lights the selected app's lines.
(() => {
  const src = `import SwiftUI

/// mostafaelbadawy.com — the home screen you are looking at.
struct HomeScreen: View {
    @State private var selected: ShippedApp?
    @Namespace private var launch

    let apps: [ShippedApp] = [
        .visitors,     // 200k+, 7 languages
        .electricity,  // 100k+ downloads, 3 apps
        .actPlus,      // Actors Syndicate, Egypt
        .alharamain,   // Grand Mosque, Mecca
        .bzaaarz,      // freelance, Kuwait
        .medjol,       // freelance, doctors
    ]

    var body: some View {
        LazyVGrid(columns: .init(repeating: GridItem(), count: 3)) {
            ForEach(apps) { app in
                AppIcon(app)
                    .matchedTransitionSource(id: app.id, in: launch)
                    .onTapGesture { selected = app }
            }
        }
        .fullScreenCover(item: $selected) { app in
            AppDetail(app)
                .navigationTransition(.zoom(sourceID: app.id, in: launch))
        }
    }
}

extension ShippedApp {
    static let visitors = ShippedApp(name: "Visitors", market: .saudiArabia,
                                     stack: [.mvvm, .uiKit, .swiftUI])
    static let electricity = ShippedApp(name: "Electricity", market: .egypt,
                                        stack: [.swiftUI, .mvvm, .modularization])
    static let actPlus = ShippedApp(name: "Act Plus", market: .egypt)
    static let alharamain = ShippedApp(name: "Alharamain", market: .saudiArabia)
    static let bzaaarz = ShippedApp(name: "Bzaaarz", stack: [.uiKit, .mvvm, .combine])
    static let medjol = ShippedApp(name: "Medjol", stack: [.uiKit, .mvvm, .rxSwift])
}`;
  const ids = { visitors: "visitors", eehc: "electricity", actplus: "actPlus", alharamain: "alharamain", bzaaarz: "bzaaarz", medjol: "medjol" };
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const paint = (line) => {
    const [code, comment] = line.split(/(?=\/\/)/);
    let h = esc(code)
      .replace(/"[^"]*"/g, (m) => `<span class="s">${m}</span>`)
      .replace(/\b(import|struct|let|var|some|private|static|extension|in)\b|(@\w+)/g, (m) => `<span class="k">${m}</span>`)
      .replace(/\b([A-Z]\w+)\b(?![^<]*<\/span>)/g, `<span class="t">$1</span>`);
    return h + (comment ? `<span class="c">${esc(comment)}</span>` : "");
  };
  const pre = document.createElement("pre");
  pre.className = "code";
  pre.innerHTML = src.split("\n").map((l) => `<span class="l">${paint(l) || " "}</span>`).join("");
  document.querySelector(".backdrop").append(pre);
  // The same array, legible, under the intro: the line for the open app is lit.
  const snip = document.createElement("pre");
  snip.className = "code snippet";
  snip.setAttribute("aria-hidden", "true");
  snip.innerHTML = [...pre.children].slice(7, 15).map((l) => l.outerHTML).join("");
  snip.querySelectorAll(".l").forEach((l) => { l.firstChild.textContent = l.firstChild.textContent.replace(/^    /, ""); });
  document.querySelector(".links").after(snip);
  const lines = [...pre.children, ...snip.children];
  document.addEventListener("app:select", (e) => {
    const n = ids[e.detail.id];
    lines.forEach((l) => l.classList.toggle("hot", new RegExp(`(^|\\s)\\.${n},|static let ${n} `).test(l.textContent)));
  });
})();
