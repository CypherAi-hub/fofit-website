import { describe, it, expect } from "vitest";

import { formatDateOnly, normalizeExercises, parseDateOnly, toDetail, toSummary } from "./adapter";

// Each test maps to a numbered requirement in the Commit-1 spec.

describe("adapter — sets & exercises", () => {
  it("1. normal weighted strength sets", () => {
    const ex = normalizeExercises([
      { name: "Bench Press", sets: [{ set: 1, weight: 185, reps: 5 }, { set: 2, weight: 185, reps: 5 }] },
    ]);
    expect(ex).toHaveLength(1);
    expect(ex[0].sets[0].kind).toBe("weighted");
    expect(ex[0].sets[0].weight).toBe(185);
    expect(ex[0].topSet?.weight).toBe(185);
    expect(ex[0].completedSetCount).toBe(2);
    expect(ex[0].hasWeighted).toBe(true);
  });

  it("2. numeric values stored as strings", () => {
    const ex = normalizeExercises([{ name: "Squat", sets: [{ set: "1", weight: "225", reps: "3" }] }]);
    expect(ex[0].sets[0].weight).toBe(225);
    expect(ex[0].sets[0].reps).toBe(3);
    expect(ex[0].sets[0].setNumber).toBe(1);
    expect(ex[0].sets[0].kind).toBe("weighted");
  });

  it("3. empty-string weight → not weighted, no inferred load", () => {
    const ex = normalizeExercises([{ name: "Push-up", sets: [{ set: 1, weight: "", reps: "20" }] }]);
    expect(ex[0].sets[0].weight).toBeNull();
    expect(ex[0].sets[0].kind).toBe("unknown"); // no explicit bodyweight flag → never inferred
    expect(ex[0].hasWeighted).toBe(false);
  });

  it("4. bodyweight exercise (explicit flag)", () => {
    const ex = normalizeExercises([{ name: "Pull-up", sets: [{ set: 1, weight: "", reps: "10", bodyweight: true }] }]);
    expect(ex[0].sets[0].kind).toBe("bodyweight");
    expect(ex[0].sets[0].isBodyweight).toBe(true);
    expect(ex[0].sets[0].weight).toBeNull();
    expect(ex[0].completedSetCount).toBe(1); // bodyweight reps count as completed
    expect(ex[0].hasBodyweight).toBe(true);
  });

  it("5. duration-only exercise", () => {
    const ex = normalizeExercises([{ name: "Plank", sets: [{ set: 1, kind: "duration", durationSec: 60 }] }]);
    expect(ex[0].sets[0].kind).toBe("duration");
    expect(ex[0].sets[0].durationSec).toBe(60);
    expect(ex[0].completedSetCount).toBe(1);
    expect(ex[0].hasDuration).toBe(true);
  });

  it("6. missing set kind → classified by data, not assumed", () => {
    const ex = normalizeExercises([{ name: "Row", sets: [{ set: 1, weight: 135, reps: 8 }] }]);
    expect(ex[0].sets[0].kind).toBe("weighted");
  });

  it("7. missing or empty sets", () => {
    const ex = normalizeExercises([{ name: "Deadlift" }, { name: "Curl", sets: [] }]);
    expect(ex).toHaveLength(2);
    expect(ex[0].sets).toEqual([]);
    expect(ex[0].completedSetCount).toBe(0);
    expect(ex[0].topSet).toBeNull();
  });

  it("8. malformed exercises JSON string → []", () => {
    expect(normalizeExercises("{not json")).toEqual([]);
    expect(normalizeExercises('[{"name":"Bench","sets":[{"weight":185,"reps":5}]}]')[0].name).toBe("Bench");
  });

  it("9. exercises value that is not an array", () => {
    expect(normalizeExercises({ name: "x" })).toEqual([]);
    expect(normalizeExercises(null)).toEqual([]);
    expect(normalizeExercises(42)).toEqual([]);
  });

  it("10. missing exercise name → skipped", () => {
    const ex = normalizeExercises([{ sets: [{ weight: 100, reps: 5 }] }, { name: "  ", sets: [] }, { name: "Bench", sets: [] }]);
    expect(ex).toHaveLength(1);
    expect(ex[0].name).toBe("Bench");
  });

  it("11. inconsistent capitalization without unsafe merging", () => {
    const ex = normalizeExercises([{ name: "Bench Press", sets: [] }, { name: "bench  press", sets: [] }]);
    expect(ex).toHaveLength(2); // NOT merged — two distinct rows preserved
    expect(ex[0].normalizedKey).toBe("bench press");
    expect(ex[1].normalizedKey).toBe("bench press"); // same key exposed, but rows stay separate
  });

  it("13. missing duration on a duration set → null, not completed", () => {
    const ex = normalizeExercises([{ name: "Plank", sets: [{ set: 1, kind: "duration" }] }]);
    expect(ex[0].sets[0].durationSec).toBeNull();
    expect(ex[0].completedSetCount).toBe(0);
  });

  it("15. zero-weight sets → not weighted, not fabricated load", () => {
    const ex = normalizeExercises([{ name: "Dip", sets: [{ set: 1, weight: "0", reps: "12" }] }]);
    expect(ex[0].sets[0].kind).toBe("unknown");
    expect(ex[0].sets[0].weight).toBeNull();
    expect(ex[0].hasWeighted).toBe(false);
  });
});

describe("adapter — sessions", () => {
  const base = {
    id: "s1",
    date: "2026-06-20",
    session_name: "Upper Push",
    exercises: [{ name: "Bench", sets: [{ weight: 185, reps: 5 }, { weight: 185, reps: 5 }] }],
    total_volume: 1850,
    duration_seconds: 2700,
    muscle_groups: ["chest", "triceps"],
  };

  it("toSummary maps real data", () => {
    const s = toSummary(base);
    expect(s.title).toBe("Upper Push");
    expect(s.totalVolume).toBe(1850);
    expect(s.durationSec).toBe(2700);
    expect(s.exerciseCount).toBe(1);
    expect(s.completedSetCount).toBe(2);
    expect(s.muscleGroups).toEqual(["chest", "triceps"]);
  });

  it("14. invalid total_volume → computed from weighted sets", () => {
    expect(toSummary({ ...base, total_volume: "oops" }).totalVolume).toBe(1850);
    expect(toSummary({ ...base, total_volume: -5 }).totalVolume).toBe(1850);
    expect(toSummary({ ...base, total_volume: NaN }).totalVolume).toBe(1850);
  });

  it("volume: bodyweight-only session → null, never a fabricated 0", () => {
    const s = toSummary({
      id: "b",
      date: "2026-06-20",
      session_name: "Calisthenics",
      total_volume: 0,
      exercises: [{ name: "Pull-up", sets: [{ reps: "10", bodyweight: true }] }],
    });
    expect(s.totalVolume).toBeNull();
  });

  it("16. partial legacy session record (only date + exercises)", () => {
    const s = toSummary({ date: "2025-01-02", exercises: [{ name: "Squat", sets: [{ weight: 200, reps: 5 }] }] });
    expect(s.title).toBe("Workout"); // honest fallback
    expect(s.id).toBe("");
    expect(s.totalVolume).toBe(1000);
    expect(s.durationSec).toBeNull();
  });

  it("17. null notes / check-in / muscle groups", () => {
    const d = toDetail({ id: "x", date: "2026-06-20", exercises: [], notes: null, check_in: null, muscle_groups: null });
    expect(d.notes).toBeNull();
    expect(d.checkIn).toBeNull();
    expect(d.muscleGroups).toEqual([]);
    expect(d.rpe).toBeNull();
    expect(d.feel).toBeNull();
  });

  it("toDetail maps notes / check-in / rpe / feel", () => {
    const d = toDetail({
      ...base,
      notes: "arms too sore for dips",
      check_in: { sleepHours: 7, soreness: 3, kneePain: 0 },
      session_rpe: 8,
      session_feel: "just_right",
    });
    expect(d.notes).toBe("arms too sore for dips");
    expect(d.checkIn).toEqual({ sleepHours: 7, soreness: 3, kneePain: 0 });
    expect(d.rpe).toBe(8);
    expect(d.feel).toBe("just_right");
    expect(d.exercises[0].topSet?.weight).toBe(185);
  });
});

describe("adapter — dates (12, timezone-safe)", () => {
  it("parseDateOnly returns calendar parts with no Date/UTC involvement", () => {
    expect(parseDateOnly("2026-06-20")).toEqual({ year: 2026, month: 6, day: 20 });
    expect(parseDateOnly("2026-01-01T00:00:00Z")).toEqual({ year: 2026, month: 1, day: 1 });
    expect(parseDateOnly("garbage")).toBeNull();
    expect(parseDateOnly(null)).toBeNull();
  });

  it("formatDateOnly never shifts the day (the YYYY-MM-DD UTC-parse bug)", () => {
    // The classic bug: new Date("2026-06-20") = UTC midnight → "Jun 19" in negative-UTC zones.
    // formatDateOnly constructs a LOCAL date, so the day is always the stored day, every timezone.
    const out = formatDateOnly("2026-06-20");
    expect(out).toContain("20");
    expect(out).not.toContain("19");
    // Year boundary (the case most prone to shifting): Jan 1 must not become Dec 31.
    expect(formatDateOnly("2026-01-01")).toContain("Jan 1");
    expect(formatDateOnly("2026-01-01")).not.toContain("Dec");
  });
});

describe("adapter — 18. never throws on malformed user data", () => {
  const garbage: unknown[] = [
    undefined, null, 0, "", "x", [], {}, [null], [{}], [{ name: 123 }],
    { exercises: "[[[" }, { exercises: { not: "array" } }, { exercises: [undefined, 1, "x"] },
    { date: 12345, total_volume: {}, duration_seconds: "abc", muscle_groups: "nope", check_in: 5 },
  ];
  it("toSummary / toDetail / normalizeExercises tolerate every garbage input", () => {
    for (const g of garbage) {
      expect(() => toSummary(g)).not.toThrow();
      expect(() => toDetail(g)).not.toThrow();
      expect(() => normalizeExercises((g as { exercises?: unknown })?.exercises)).not.toThrow();
    }
  });
});
