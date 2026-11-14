// A3: places the floor's horizon exactly at the base of the scenes.
(() => {
  const bd = document.querySelector(".backdrop");
  bd.innerHTML = `<div class="light"></div><div class="floor"></div>`;
  const canvas = document.querySelector(".canvas");
  const place = () => {
    const board = document.querySelector(".scene.home .board");
    const y = board.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top;
    bd.style.setProperty("--floor", `${y + 2}px`);
  };
  addEventListener("resize", place); addEventListener("load", place); requestAnimationFrame(place);
})();
