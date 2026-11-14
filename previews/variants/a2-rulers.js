// A2: rulers with numbers, plus edge guides and a size tag that follow the measured icon.
(() => {
  const canvas = document.querySelector(".canvas");
  const bd = document.querySelector(".backdrop");
  bd.innerHTML = `<div class="corner"></div><div class="rx"><i class="band"></i></div><div class="ry"><i class="band"></i></div>
    <i class="g v"></i><i class="g v"></i><i class="g h"></i><i class="g h"></i>`;
  canvas.insertAdjacentHTML("beforeend", `<span class="dim" aria-hidden="true"></span>`);
  const [rx, ry] = [bd.querySelector(".rx"), bd.querySelector(".ry")];
  const [l, r, t, b] = bd.querySelectorAll(".g");
  const dim = canvas.querySelector(".dim");
  let current = null;

  function numbers() {
    rx.querySelectorAll("span").forEach((s) => s.remove()); ry.querySelectorAll("span").forEach((s) => s.remove());
    for (let x = 0; x < rx.clientWidth; x += 100) rx.insertAdjacentHTML("beforeend", `<span style="left:${x}px">${x}</span>`);
    for (let y = 100; y < ry.clientHeight; y += 100) ry.insertAdjacentHTML("beforeend", `<span style="top:${y}px">${y}</span>`);
  }
  function measure(btn) {
    const icon = btn?.querySelector(".icon"); if (!icon) return;
    const c = canvas.getBoundingClientRect(), i = icon.getBoundingClientRect();
    const x = i.left - c.left, y = i.top - c.top, w = i.width, h = i.height;
    l.style.left = `${x}px`; r.style.left = `${x + w - 1}px`; t.style.top = `${y}px`; b.style.top = `${y + h - 1}px`;
    const rxOff = rx.getBoundingClientRect().left - c.left, ryOff = ry.getBoundingClientRect().top - c.top;
    Object.assign(rx.firstElementChild.style, { left: `${x - rxOff}px`, width: `${w}px` });
    Object.assign(ry.firstElementChild.style, { top: `${y - ryOff}px`, height: `${h}px` });
    dim.textContent = `${Math.round(w)} × ${Math.round(h)} pt`;
    Object.assign(dim.style, { left: `${x + w / 2}px`, top: `${y - 26}px` });
  }
  document.addEventListener("app:select", (e) => {
    current = document.querySelector(`#grid [data-id="${e.detail.id}"]`);
    requestAnimationFrame(() => measure(current));
  });
  document.getElementById("grid").addEventListener("pointerover", (e) => measure(e.target.closest("button") || current));
  document.getElementById("grid").addEventListener("pointerleave", () => measure(current));
  document.getElementById("grid").addEventListener("focusin", (e) => measure(e.target.closest("button")));
  addEventListener("resize", () => { numbers(); measure(current); });
  addEventListener("load", () => { numbers(); measure(current); });
  numbers();
})();
