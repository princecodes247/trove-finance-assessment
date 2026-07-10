const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDeterministicDate(date: Date): string {
  // Use UTC values to prevent local time formatting hydration mismatches
  const day = date.getUTCDate();
  const month = MONTHS[date.getUTCMonth()];
  return `${month} ${day}`;
}

export function formatDeterministicFullDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = MONTHS[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export interface GenerateCurveParams {
  startValue: number;
  endValue: number;
  days?: number;
  volatilityRange?: [number, number]; // [min, max] percentage
  endDate?: string;
}

/**
 * Procedurally generates a historical curve starting from startValue 
 * and ending at endValue with some randomized market volatility.
 */
export function generateProceduralCurve({
  startValue,
  endValue,
  days = 30,
  volatilityRange = [-0.015, 0.015],
  endDate = new Date().toISOString()
}: GenerateCurveParams) {
  const history = [];
  let currentValue = startValue;
  const dailyDrift = (endValue - startValue) / days;
  const [minVol, maxVol] = volatilityRange;

  const targetDate = new Date(endDate);

  for (let i = days; i >= 0; i--) {
    const date = new Date(targetDate);
    date.setDate(date.getDate() - i);
    const timeStr = formatDeterministicDate(date);

    if (i === days) {
      // Oldest day = start value
      history.push({ time: timeStr, value: startValue });
    } else if (i === 0) {
      // Today = end value
      history.push({ time: timeStr, value: endValue });
    } else {
      // Add steady drift + random market volatility
      const volatility = currentValue * (Math.random() * (maxVol - minVol) + minVol);
      currentValue = currentValue + dailyDrift + volatility;
      history.push({ time: timeStr, value: parseFloat(currentValue.toFixed(2)) });
    }
  }

  return history;
}

export const numberFormatConfig = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
/**
 * Formats a number as a USD price string with 2 decimal places.
 * Optionally prepends a sign prefix (e.g. "+$1,234.56" or "-$1,234.56").
 */
export function formatPrice(value: number, prefix: string = ""): string {
  return `${prefix}$${value.toLocaleString(undefined, numberFormatConfig)}`;
}
