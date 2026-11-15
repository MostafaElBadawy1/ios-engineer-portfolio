/** Screen-only styles for showing the print CV as a page on the site. */
const SCREEN_STYLES = `<style>
  html { background: #fffcf5; }
  body { margin: 0 auto; padding: 44px 52px; max-width: 820px; }
  @media (max-width: 600px) { body { padding: 24px 18px; } }
</style>`;

/**
 * Turns the print CV (cv/cv.html) into a document for an on-site viewer:
 * adds screen padding, a mobile viewport, and makes links open in a new tab.
 * @throws when the source has no </head>, so a broken CV never ships silently.
 */
export function toViewerDocument(cvHtml: string): string {
  if (!cvHtml.includes("</head>")) throw new Error("CV source is missing </head>.");
  const head = `<meta name="viewport" content="width=device-width, initial-scale=1" /><base target="_blank" />${SCREEN_STYLES}`;
  return cvHtml.replace("</head>", `${head}</head>`);
}
