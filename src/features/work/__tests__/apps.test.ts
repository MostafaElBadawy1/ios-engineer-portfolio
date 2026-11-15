import { describe, expect, it } from "vitest";
import { appSchema, type AppData, type AppEntry } from "../../../types/app";
import { ownApps, screenRows, shippedApps, sortForWork } from "../utils/apps";

const base: AppData = appSchema.parse({
  name: "Sample",
  summary: "A sample app.",
  role: "iOS Engineer",
  organization: "Fixed Solutions",
  status: "live",
  contributions: ["Built things."],
  icon: { monogram: "Sa", tint: "#071722", ink: "#FDF0D5" },
  order: 2,
});
const entry = (id: string, data: Partial<AppData>): AppEntry => ({ id, data: { ...base, ...data } });

describe("sortForWork", () => {
  it("orders apps by their order field without mutating the input", () => {
    const input = [entry("b", { order: 2 }), entry("a", { order: 1 })];
    expect(sortForWork(input).map((e) => e.id)).toEqual(["a", "b"]);
    expect(input[0]?.id).toBe("b");
  });

  it("breaks ties by name", () => {
    const input = [entry("z", { order: 1, name: "Zed" }), entry("y", { order: 1, name: "Alpha" })];
    expect(sortForWork(input).map((e) => e.id)).toEqual(["y", "z"]);
  });
});

describe("ownApps", () => {
  it("keeps only apps marked as the owner's own", () => {
    expect(ownApps([entry("client", {}), entry("mine", { ownApp: true })]).map((e) => e.id)).toEqual(["mine"]);
  });

  it("returns an empty list when there are none", () => {
    expect(ownApps([entry("client", {})])).toEqual([]);
  });
});

describe("screenRows", () => {
  it("shows only the facts the content file states", () => {
    const labels = screenRows(base).map((r) => r.label);
    expect(labels).toEqual(["Role", "Built at", "Status"]);
  });

  it("adds market, metrics, and stack when present", () => {
    const rows = screenRows({
      ...base,
      market: "Egypt",
      metrics: [{ value: "100k+", label: "downloads" }],
      stack: ["UIKit", "MVVM"],
    });
    expect(rows).toContainEqual({ label: "Market", value: "Egypt" });
    expect(rows).toContainEqual({ label: "Downloads", value: "100k+" });
    expect(rows).toContainEqual({ label: "Stack", value: "UIKit, MVVM" });
  });

  it("labels freelance work as an engagement and retired apps as retired", () => {
    const rows = screenRows({ ...base, organization: "Freelance", status: "retired" });
    expect(rows).toContainEqual({ label: "Engagement", value: "Freelance" });
    expect(rows).toContainEqual({ label: "Status", value: "Retired" });
  });
});

describe("appSchema", () => {
  it("rejects an app with no contributions", () => {
    expect(() => appSchema.parse({ ...base, contributions: [] })).toThrow();
  });

  it("rejects an icon tint that is not a hex colour", () => {
    expect(() => appSchema.parse({ ...base, icon: { ...base.icon, tint: "red" } })).toThrow();
  });

  it("rejects a store link that is not a URL", () => {
    expect(() => appSchema.parse({ ...base, storeUrl: "not a url" })).toThrow();
  });
});

describe("in-development apps", () => {
  it("reads as in development on the phone screen", () => {
    expect(screenRows({ ...base, status: "in-development" })).toContainEqual({ label: "Status", value: "In development" });
  });

  it("are not counted as shipped", () => {
    const apps = [entry("live", {}), entry("old", { status: "retired" }), entry("wip", { status: "in-development" })];
    expect(shippedApps(apps).map((e) => e.id)).toEqual(["live", "old"]);
  });
});

describe("icon image", () => {
  it("accepts a file name in the icons folder", () => {
    expect(appSchema.parse({ ...base, icon: { ...base.icon, image: "act-plus.png" } }).icon.image).toBe("act-plus.png");
  });

  it("rejects paths, so icons always come from src/assets/icons", () => {
    expect(() => appSchema.parse({ ...base, icon: { ...base.icon, image: "../secret.png" } })).toThrow();
  });
});
