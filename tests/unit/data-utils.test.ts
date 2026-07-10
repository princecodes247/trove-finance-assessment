import { describe, it, expect } from "vitest";
import { formatDeterministicDate, formatDeterministicFullDate, formatPrice, generateProceduralCurve } from "~/../../lib/data/utils";

describe("formatDeterministicDate", () => {
  it("formats a UTC date as 'Mon D'", () => {
    // Jan 15, 2025 UTC
    const date = new Date(Date.UTC(2025, 0, 15));
    expect(formatDeterministicDate(date)).toBe("Jan 15");
  });

  it("handles single-digit days", () => {
    const date = new Date(Date.UTC(2025, 5, 3));
    expect(formatDeterministicDate(date)).toBe("Jun 3");
  });

  it("handles December 31", () => {
    const date = new Date(Date.UTC(2025, 11, 31));
    expect(formatDeterministicDate(date)).toBe("Dec 31");
  });
});

describe("formatDeterministicFullDate", () => {
  it("formats an ISO date string as 'Mon D, YYYY'", () => {
    expect(formatDeterministicFullDate("2025-03-22T12:00:00Z")).toBe("Mar 22, 2025");
  });

  it("handles dates in earlier months", () => {
    expect(formatDeterministicFullDate("2024-01-01T00:00:00Z")).toBe("Jan 1, 2024");
  });
});

describe("formatPrice", () => {
  it("formats a number as a USD price string", () => {
    const result = formatPrice(1234.5);
    expect(result).toContain("$");
    expect(result).toContain("1");
    expect(result).toContain("234");
    expect(result).toContain(".50");
  });

  it("adds a prefix when provided", () => {
    const result = formatPrice(500, "+");
    expect(result).toMatch(/^\+\$/);
  });

  it("formats zero correctly", () => {
    const result = formatPrice(0);
    expect(result).toContain("$");
    expect(result).toContain("0.00");
  });
});

describe("generateProceduralCurve", () => {
  it("returns correct number of data points", () => {
    const result = generateProceduralCurve({
      startValue: 1000,
      endValue: 1500,
      days: 10,
      endDate: "2025-06-15T00:00:00Z",
    });
    // days + 1 points (inclusive of start and end)
    expect(result).toHaveLength(11);
  });

  it("starts and ends with the specified values", () => {
    const result = generateProceduralCurve({
      startValue: 1000,
      endValue: 2000,
      days: 5,
      endDate: "2025-06-15T00:00:00Z",
    });
    expect(result[0].value).toBe(1000);
    expect(result[result.length - 1].value).toBe(2000);
  });

  it("each point has time and value properties", () => {
    const result = generateProceduralCurve({
      startValue: 100,
      endValue: 200,
      days: 3,
      endDate: "2025-06-15T00:00:00Z",
    });
    for (const point of result) {
      expect(point).toHaveProperty("time");
      expect(point).toHaveProperty("value");
      expect(typeof point.time).toBe("string");
      expect(typeof point.value).toBe("number");
    }
  });
});
