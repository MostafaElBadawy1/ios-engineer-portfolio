// Renders public/cv.pdf from cv/cv.html and public/og.png from scripts/og.html.
// Run after editing either source: npm run assets
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch();
try {
  const cv = await browser.newPage();
  await cv.goto(pathToFileURL(path.join(root, "cv/cv.html")).href, { waitUntil: "networkidle" });
  await cv.pdf({ path: path.join(root, "public/cv.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });

  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto(pathToFileURL(path.join(root, "scripts/og.html")).href, { waitUntil: "networkidle" });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: path.join(root, "public/og.png") });
  console.log("Rendered public/cv.pdf and public/og.png");
} finally {
  await browser.close();
}
