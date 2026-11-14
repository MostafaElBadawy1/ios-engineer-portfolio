// Direction A shared behavior. Emits `app:select` so each backdrop can react.
const grid = document.getElementById("grid");
  const scene = document.getElementById("app");
  const detail = document.getElementById("detail");
  const phone = matchMedia("(max-width: 720px)");
  let opener = null;

  grid.innerHTML = APPS.map((a) => `
    <button class="icon-button" type="button" data-id="${a.id}" aria-pressed="false" aria-controls="app">
      ${iconHTML(a, 62)}<span class="lbl">${a.name}</span>
    </button>`).join("");

  function show(id, fromUser) {
    const app = APPS.find((a) => a.id === id);
    fillDetail(scene, app, 64);
    grid.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === id)));
    detail.classList.remove("swap"); void detail.offsetWidth; detail.classList.add("swap");
    detail.scrollTop = 0;
    document.dispatchEvent(new CustomEvent("app:select", { detail: app }));
    if (fromUser && phone.matches) { scene.classList.add("open"); document.getElementById("back").focus(); }
  }
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    opener = b; show(b.dataset.id, true);
  });
  document.getElementById("back").addEventListener("click", () => { scene.classList.remove("open"); opener?.focus(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && scene.classList.contains("open")) { scene.classList.remove("open"); opener?.focus(); } });
  show("visitors", false);
