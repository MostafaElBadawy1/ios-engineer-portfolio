import { describe, expect, it } from "vitest";
import { toViewerDocument } from "../utils/viewer-document";

const source = "<!doctype html><html><head><title>CV</title></head><body><a href='https://x.dev'>x</a></body></html>";

describe("toViewerDocument", () => {
  it("makes links open in a new tab so the viewer frame is never navigated away", () => {
    expect(toViewerDocument(source)).toContain('<base target="_blank" />');
  });

  it("adds a mobile viewport and screen padding inside the head", () => {
    const doc = toViewerDocument(source);
    expect(doc.indexOf("viewport")).toBeLessThan(doc.indexOf("</head>"));
    expect(doc).toContain("padding: 44px 52px");
  });

  it("keeps the CV body unchanged", () => {
    expect(toViewerDocument(source)).toContain("<body><a href='https://x.dev'>x</a></body>");
  });

  it("refuses a source without a head instead of shipping a broken page", () => {
    expect(() => toViewerDocument("<p>no head</p>")).toThrow("missing </head>");
  });
});
