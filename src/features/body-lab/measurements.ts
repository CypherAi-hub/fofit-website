// Shared body-measurement fields (cm) — used by the capture card to collect them and the
// compare view to show deltas. Stored as a `Record<string, number>` in body_check_ins.measurements
// (the schema + service already support it; this just wires the UI to the existing field).
export const BODY_MEASUREMENTS: { key: string; label: string }[] = [
  { key: "waist", label: "Waist" },
  { key: "chest", label: "Chest" },
  { key: "arms", label: "Arms" },
  { key: "thighs", label: "Thighs" },
  { key: "hips", label: "Hips" },
];

/** Parse a measurements input map (string values) into the stored numeric map, dropping
 *  empty / non-finite / non-positive entries. Returns null when nothing valid was entered. */
export function parseMeasurements(input: Record<string, string>): Record<string, number> | null {
  const out: Record<string, number> = {};
  for (const { key } of BODY_MEASUREMENTS) {
    const raw = input[key]?.trim();
    if (!raw) continue;
    const n = parseFloat(raw);
    if (Number.isFinite(n) && n > 0) out[key] = n;
  }
  return Object.keys(out).length > 0 ? out : null;
}
