import { describe, expect, it } from "vitest";
import { formatLocalTime } from "../utils/local-time";

describe("formatLocalTime", () => {
  it("converts UTC to Cairo wall-clock time in 24-hour format", () => {
    expect(formatLocalTime(new Date("2026-01-15T10:05:00Z"), "Africa/Cairo")).toBe("12:05");
  });

  it("pads single-digit hours", () => {
    expect(formatLocalTime(new Date("2026-01-15T05:30:00Z"), "UTC")).toBe("05:30");
  });

  it("throws for an unknown time zone instead of guessing", () => {
    expect(() => formatLocalTime(new Date(), "Mars/Olympus")).toThrow(RangeError);
  });
});
