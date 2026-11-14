import type { AppData, AppEntry } from "../../../types/app";

/** One label/value row on the phone's app screen. */
export interface ScreenRow {
  label: string;
  value: string;
}

/**
 * Apps in story order (the `order` field), ties broken by name so builds are stable.
 * @returns a new array; the input is not mutated.
 */
export function sortForWork(entries: readonly AppEntry[]): AppEntry[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

/** Apps that get their own landing, privacy, and support pages. */
export function ownApps(entries: readonly AppEntry[]): AppEntry[] {
  return entries.filter((entry) => entry.data.ownApp);
}

/**
 * Facts shown on the phone screen, in reading order. Skips anything the content
 * file does not state, so the phone never displays an invented value.
 */
export function screenRows(app: AppData): ScreenRow[] {
  const rows: ScreenRow[] = [
    { label: "Role", value: app.role },
    { label: app.organization === "Freelance" ? "Engagement" : "Built at", value: app.organization },
  ];
  if (app.market) rows.push({ label: "Market", value: app.market });
  for (const metric of app.metrics) rows.push({ label: capitalize(metric.label), value: metric.value });
  if (app.stack.length > 0) rows.push({ label: "Stack", value: app.stack.join(", ") });
  rows.push({ label: "Status", value: app.status === "live" ? "On the App Store" : "Retired" });
  return rows;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
