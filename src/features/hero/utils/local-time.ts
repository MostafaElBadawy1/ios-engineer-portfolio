/**
 * Formats a moment as 24-hour wall-clock time in a given IANA time zone.
 * @returns e.g. "14:05"
 */
export function formatLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(date);
}
